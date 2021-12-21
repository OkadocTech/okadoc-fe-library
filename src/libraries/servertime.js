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
                console.log(this.getServerTime().toUTCString());
            }, INTERVAL_VAL);
        }
    },
    initialize: function () {
        if (!this.usingServerTime) {
            const self = this;
            // get server time
            fetch(`https://service.okadoc.co/locale/v1/appservice/time`)
                .then(response => {
                    if (response.ok) {
                        response.json().then(result => {
                            const hasDateTime = result && result.data.time;
                            if (hasDateTime) {
                                self.startServerTimeCounter(result.data.time);
                            }
                        });
                    }
                });
        }
    }
};

export default ServerTime;