import axios from 'axios';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import Cookies from 'universal-cookie';

const INTERVAL_VAL = 1000;
const ACCEPTED_DIFF_TIME_IN_SECONDS = 300;
const SERVER_TIME_API_URL = 'https://service.okadoc.com/locale/v1/appservice/time';
const isValidDate = function (dateTime) {
    if (dateTime) {
        try {
            const timestamp = Date.parse(dateTime);
            return (isNaN(timestamp) === false);
        } catch (error) {
            return false;
        }
    }
    return false;
};

const getSecondsBetweenDates = function(startDate, endDate) {
    let diff = endDate.getTime() - startDate.getTime();

    return (diff / 1000);
};

const Timer = function () {
    this.value = null;
    this.counter = null;
    this.initialized = false;
    this.isUseServerTime = false;
};

Timer.prototype.get = function () {
    if (this.isUseServerTime && this.value) {
        return this.value;
    }
    return new Date();
};

Timer.prototype.start = async function (dateTime) {
    const self = this;

    if (self.counter) {
        clearInterval(self.counter);
        self.counter = null;
    }

    return new Promise(resolve => {
        if (isValidDate(dateTime)) {
            const localDate = new Date();
            self.value = new Date(dateTime);
            const timeDiffInSeconds = getSecondsBetweenDates(localDate, self.value);

            if (timeDiffInSeconds > ACCEPTED_DIFF_TIME_IN_SECONDS) {
                self.isUseServerTime = true;
                self.counter = setInterval(() => {
                    const nextSecond = self.value.getSeconds() + 1;
                    self.value.setSeconds(nextSecond);
                }, INTERVAL_VAL);
            }
        }
        resolve(true);
    });
};

Timer.prototype.init = async function () {
    if (!this.isUseServerTime && typeof axios.get === 'function') {
        const self = this;
        // get server time
        const res = await axios.get(SERVER_TIME_API_URL).catch(err => {
            console.error('Failed to get server time: ', err);
            if (self.counter) {
                clearInterval(self.counter);
                self.counter = null;
            }
        });

        const isSuccess = res.status === 200;
        const dateTime = _get(res, 'data.data.time') || false;

        if (isSuccess && dateTime) {
            await self.start(dateTime);
            self.initialized = true;
        }
    }
};

export default Timer;

let cookies = new Cookies();
const serverTimeDiffMaxAge = 10 * 60 * 1000;
const serverTimeDiffKey = '__D1Ff5t';

const setCookie = ({ isServer = false, cookieSetter = null, value, maxAge }) => {
    const opts = { maxAge, secure: true }
    if (isServer && (typeof cookieSetter === 'function')) {
        cookieSetter(serverTimeDiffKey, clientID, opts);
    } else {
        cookies.set(serverTimeDiffKey, value, { ...opts, path: '/' });
    }
};

const getCookie = ({ isServer = false, cookieHeaders = '' }) => {
    try {
        const cookieHandler = isServer ? new Cookies(cookieHeaders) : cookies;
        return +(cookieHandler.get(serverTimeDiffKey)) || 0;
    } catch (error) {
        return 0;
    }
};

const getServerTimeDiffInfo = async() => {
    let timeDiff = 0;
    const res = await axios.get(SERVER_TIME_API_URL).catch(err => {
        console.error('Failed to get server time: ', err);
    });

    const time = _get(res, 'data.data.time') || false;
    if ((res.status === 200) && (time && isValidDate(time))) {
        const serverTime = new Date(time).getTime();
        const localTime = new Date().getTime();

        // total diff in ms
        const diff = (serverTime > localTime) ? (serverTime - localTime) :  0;

        if ((diff / 1000) >= ACCEPTED_DIFF_TIME_IN_SECONDS) {
            timeDiff = diff;
        }
    }

    return timeDiff;
};

export const getTimeDiff = async({ isServer = false, cookieHeaders = '', cookieSetter = false, maxAge = serverTimeDiffMaxAge }) => {
    let timeDiff = getCookie({ isServer, cookieHeaders }) || 0;

    if (timeDiff && (timeDiff > 0)) {
        return  timeDiff
    }

    const diff = await getServerTimeDiffInfo();
    if (diff && (diff > 0)) {
        timeDiff = diff;
        setCookie({ isServer, value: diff, cookieSetter, maxAge });
    }

    return timeDiff;
};