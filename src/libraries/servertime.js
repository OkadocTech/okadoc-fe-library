import axios from 'axios';

const INTERVAL_VAL = 1000;
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
    serverTime: null,
    usingServerTime: false,
    serverTimeCounter: null,
    getServerTime: function () {
        if (this.usingServerTime && this.serverTime) {
            return this.serverTime;
        }
        return new Date();
    },
    startServerTimeCounter: function (dateTime) {
        if (isValidDate(dateTime)) {
            this.usingServerTime = true;
            this.initialized = true;
            this.serverTime = new Date(dateTime);
            this.serverTimeCounter = setInterval(() => {
                const nextSecond = this.serverTime.getSeconds() + 1;
                this.serverTime.setSeconds(nextSecond);
            }, INTERVAL_VAL);
        }
    },
    initialize: function () {
        if (!this.usingServerTime) {
            const self = this;
            // get server time
            axios.get(`${process.env.LOCALE_SERVICE_URL}/appservice/time`).then(res => {
                console.log('felibs res get time: ', res);
                const isSuccess = res.status === 200;
                const hasDateTime = res && res.data.data.time;
                if (isSuccess && hasDateTime) {
                    self.startServerTimeCounter(res.data.data.time);
                }
            }).catch(err =>  {
                console.error('Failed to get server time: ', error);
            });
        }
    }
};

export default ServerTime;