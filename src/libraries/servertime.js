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

const ServerTime = {
    time: null,
    counter: null,
    initialized: false,
    isUseServerTime: false,
    getTime: function () {
        if (this.isUseServerTime && this.time) {
            return this.time;
        }
        return new Date();
    },
    start: function (dateTime) {
        if (isValidDate(dateTime)) {
            this.isUseServerTime = true;
            this.initialized = true;
            this.time = new Date(dateTime);
            this.counter = setInterval(() => {
                const nextSecond = this.time.getSeconds() + 1;
                this.time.setSeconds(nextSecond);
            }, INTERVAL_VAL);
        }
    },
    init: async function () {
        if (!this.usingServerTime) {
            const self = this;
            // get server time
            const res = await axios.get(SERVER_TIME_API_URL).catch(err => {
                console.error('Failed to get server time: ', err);
            });

            const isSuccess = res.status === 200;
            const dateTime = _get(res, 'data.data.time') || false;

            if (isSuccess && dateTime) {
                this.initialized =  true;
                self.start(dateTime);
            }
        }
    }
};

export default ServerTime;