import _get from 'lodash/get';
import sha256 from 'crypto-js/sha256';
import Base64 from 'crypto-js/enc-base64';
import hMacSHA256 from 'crypto-js/hmac-sha256';

const defaultHttpVersion = 'HTTP/1.1';
const algorithm = 'hmac-sha256';
const methodList = ['GET', 'POST', 'UPDATE', 'DELETE', 'PUT'];

const getUTCDate = () => new Date().toUTCString();

const getUrlPath = (url) => {
    const match = url.match(/^(https?:)\/\/(([^:/?#]*)(?::([0-9]+))?)([/]{0,1}[^?#]*)(\?[^#]*|)(#.*|)$/);
    if (match) {
        return match[5];
    }
    return '/';
};

class OkaHMAC {

    config = {}

    methodList = ['GET', 'POST', 'UPDATE', 'DELETE', 'PUT']

    constructor(kongServiceConfigs = '{}') {
        this.setConfig(kongServiceConfigs)
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

    generateHeader = (params) => {
        const { data = {}, isJQueryAjax = false, url = '', name, httpVersion = '', type = '' } = params;
        let { method } = params;

        if (isJQueryAjax) {
            method = type;
        }

        const serviceConfig = this.getConfigs(name);
        if (!serviceConfig || !serviceConfig.enabled) {
            return '';
        }

        this.validates(params);

        const httpVersionVal = httpVersion || defaultHttpVersion;
        const requestMethod = method.toUpperCase();

        let packet = data || '';
        if (typeof packet === 'object') {
            packet = JSON.stringify(data);
        }

        // digest body
        const body = sha256(packet);
        const digest = `SHA-256=${Base64.stringify(body)}`;

        const path = getUrlPath(url);
        const dateUTC = getUTCDate();

        const request = `x-date: ${dateUTC}\n${requestMethod} ${path} ${httpVersionVal}\ndigest: ${digest}`;
        const hash = hMacSHA256(request, serviceConfig.consumerSecret);
        const base64 = Base64.stringify(hash);
        const signature = `hmac username="${serviceConfig.username}", algorithm="${algorithm}", headers="x-date request-line digest", signature="${base64}"`;

        return {
            'Oka-Authorization': signature,
            Digest: digest,
            Date: dateUTC,
            method
        };
    }
}

export default OkaHMAC;