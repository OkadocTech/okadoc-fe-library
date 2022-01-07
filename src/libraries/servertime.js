import axios from 'axios';
import _get from 'lodash/get';

const INTERVAL_VAL = 1000;
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
}

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
            self.isUseServerTime = true;
            self.value = new Date(dateTime);
            self.counter = setInterval(() => {
                const nextSecond = self.value.getSeconds() + 1;
                self.value.setSeconds(nextSecond);
            }, INTERVAL_VAL);
        }
        resolve(true);
    });
};

Timer.prototype.init = async function () {
    if (!this.isUseServerTime) {
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