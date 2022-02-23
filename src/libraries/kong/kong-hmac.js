import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import sha256 from 'crypto-js/sha256';
import Base64 from 'crypto-js/enc-base64';
import hMacSHA256 from 'crypto-js/hmac-sha256';

const defaultHttpVersion = 'HTTP/1.1';
const algorithm = 'hmac-sha256';
const methodList = ['GET', 'POST', 'UPDATE', 'DELETE', 'PUT'];

const getUrlPath = (url) => {
    let urlPath = url;
    const match = url.match(/^(https?:)\/\/(([^:/?#]*)(?::([0-9]+))?)([/]{0,1}[^?#]*)(\?[^#]*|)(#.*|)$/);

    if (match) {
        urlPath = match[5];
        return urlPath;
    }

    return url;
};

/**
 * Get date in UTC string date formatting 
 * @param {*} timeDiff timestamp in ms
 */
export const getXDateValue = (timeDiff = 0) => {
    let xDate = new Date();
    if (timeDiff && (timeDiff > 0)) {
        const localTime = xDate.getTime();
        xDate = new Date(localTime + timeDiff);
    }
    return xDate.toUTCString();
};

class OkaHMAC {

    config = {}

    methodList = ['GET', 'POST', 'UPDATE', 'DELETE', 'PUT']

    constructor(kongServiceConfigs = '{}') {
        this.setConfig(kongServiceConfigs);
        this.hmacInfo = {
            xDigest: null,
            xSignature: null,
            xDate: null
        };
    }

    setConfig = (kongServiceConfigs = null) => {
        if (typeof kongServiceConfigs === 'string') {
            try {
                this.config = JSON.parse(kongServiceConfigs);
            } catch (error) {
                this.config = {};
            }
        } else if (typeof kongServiceConfigs === 'object') {
            this.config = kongServiceConfigs || {};
        } else {
            this.config = {};
        }
    }

    validates = ({ url = null, method = false, type = false }) => {
        const methodUsed = method || type || '';
        let errMsg = '';

        if (!url) errMsg = 'service URL is not defined';
        else if (!methodUsed) errMsg = 'service Method is not defined';

        const requestMethod = methodUsed.toUpperCase();
        if (methodList.indexOf(requestMethod) === -1) {
            errMsg = 'invalid service Method';
        }

        if (errMsg) {
            throw new Error(errMsg);
        }
    }

    getConfigs = serviceName => {
        const servicesConfig = this.config || '{}';
        return _get(servicesConfig, serviceName) || {};
    }

    generateHeader = (context) => {
        const { data, isJQueryAjax = false, baseURL = '', url = '', name, httpVersion = '', type = '', timeDiff = 0 } = context;

        let { method } = context;

        if (isJQueryAjax) {
            method = type;
        }

        const serviceConfig = this.getConfigs(name);

        if (!serviceConfig || !serviceConfig.enabled) {
            return '';
        }

        this.validates(context);

        const httpVersionVal = httpVersion || defaultHttpVersion;
        const requestMethod = method.toUpperCase();

        let packet = data;
        if (typeof packet === 'object') {
            packet = JSON.stringify(data);
        }

        // digest body
        const body = sha256(packet);
        const digest = `SHA-256=${Base64.stringify(body)}`;

        const isFullPathUrl = (/^http(s)?:\/\/.*$/).test(url);
        const requestUrl = (isJQueryAjax || isFullPathUrl) ? url : `${baseURL}${url}`;
        const path = getUrlPath(requestUrl);

        const xDate = getXDateValue(timeDiff);
        const request = `x-date: ${xDate}\n${requestMethod} ${path} ${httpVersionVal}\ndigest: ${digest}`;
        const hash = hMacSHA256(request, serviceConfig.consumerSecret);
        const signature = Base64.stringify(hash);
        const signatureHeader = `hmac username="${serviceConfig.username}", algorithm="${algorithm}", headers="x-date request-line digest", signature="${signature}"`;

        this.hmacInfo = {
            xSignature: signatureHeader,
            xDigest: digest,
            xDate
        };

        return {
            'Oka-Authorization': signatureHeader,
            Digest: digest,
            xDate
        };
    }

    updateHeaders = (context) => {
        const kongRequestHeader = this.generateHeader(context);

        if (!_isEmpty(kongRequestHeader)) {
            const { xSignature, xDigest, xDate } = this.hmacInfo;
            context.headers['Oka-Authorization'] = xSignature;
            context.headers.Digest = xDigest;
            context.headers['X-Date'] = xDate;
        }
    }
}

export default OkaHMAC;