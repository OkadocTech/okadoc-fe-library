import axios from 'axios';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import Cookies from 'universal-cookie';

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

let cookies = new Cookies();
const serverTimeDiffMaxAge = 10 * 60 * 1000;
const serverTimeDiffKey = '__D1Ff5t';

const setCookie = (value = 0, options = {}) => {
    const opts = { secure: true, ...options }
    const cookieVal = JSON.stringify({ diff: value, called: true });

    cookies.set(serverTimeDiffKey, cookieVal, { ...opts, path: '/' });
};

const getCookie = () => {
    const defValue = { diff: 0, called: false };

    try {
        const cookieVal = cookies.get(serverTimeDiffKey) || '';
        if (cookieVal) {
            return JSON.parse(cookieVal);
        }
        return defValue;

    } catch (error) {
        return defValue;
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

export const getTimeDiff = async(options = {}) => {
    try {
        const { cookieOptions = { maxAge: serverTimeDiffMaxAge }, isServer = false, skipGetServerTime = false } = options;

        // No need to check `time-diff` if the request runs on the server-side (ssr)
        if (isServer) return 0;

        const cookieVal = getCookie();
        let timeDiff = +(_get(cookieVal, 'diff')) || 0;
        const isCalled = _get(cookieVal, 'called') || false;

        if (timeDiff && (timeDiff > 0)) {
            return timeDiff;
        }

        if (!isCalled && !skipGetServerTime) {
            const diff = await getServerTimeDiffInfo();
            // api for `get-server-time` has been called.
            // store the `time-difference` value into the cookie for 10 minutes ttl
            setCookie(diff, cookieOptions);
            timeDiff = (diff && (diff > 0)) ? diff : 0;
        }

        return timeDiff;
    } catch (error) {
        console.log('error in getting time different: ', error);
        return 0;
    }
};

let subscribers = [];
let isXDateRefreshed = false;

const subscribeRefreshXDate = callback => {
    subscribers.push(callback);
};

const onXDateRefreshed = timeDiff => subscribers.map(callback => callback(timeDiff));

export const refreshXDate = (axiosConfig = {}, callBack) => {
    const originalRequest = axiosConfig;
    // check whether refresh x-Date has been called
    if (!isXDateRefreshed) {
        isXDateRefreshed = true;
        getTimeDiff().then(diff => {
            if (diff > 0) {
                isXDateRefreshed = false;
                onXDateRefreshed(diff);
                // clear all subscribers
                subscribers = [];
            }
        }).catch(err => err);
    }

    // re-call previous request ...
    return new Promise(resolve => {
        subscribeRefreshXDate(timeDiff => {
            originalRequest.timeDiff = timeDiff;

            if (typeof callBack === 'function') {
                callBack(originalRequest);
            }

            resolve(axios(originalRequest));
        });
    });
};