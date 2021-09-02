!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports['"okadoc-libs']=e():t['"okadoc-libs']=e()}(this,(function(){return(()=>{var t={3233:(t,e,r)=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=s(r(7361)),o=s(r(2153)),i=s(r(8269)),a=s(r(8010));function s(t){return t&&t.__esModule?t:{default:t}}function c(t){return(c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function u(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function f(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}var p="HTTP/1.1",h="hmac-sha256",l=["GET","POST","UPDATE","DELETE","PUT"],d=function(){return(new Date).toUTCString()},v=function(t){var e=t.match(/^(https?:)\/\/(([^:/?#]*)(?::([0-9]+))?)([/]{0,1}[^?#]*)(\?[^#]*|)(#.*|)$/);return e?e[5]:"/"};e.default=function t(){var e=this,r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"{}";u(this,t),f(this,"config",{}),f(this,"methodList",["GET","POST","UPDATE","DELETE","PUT"]),f(this,"validates",(function(t){var e=t.url,r=void 0===e?null:e,n=t.method,o=void 0!==n&&n,i=t.type,a=o||void 0!==i&&i||"",s="";r?a||(s="service Method is not defined"):s="service URL is not defined";var c=a.toUpperCase();if(-1===l.indexOf(c)&&(s="invalid service Method"),s)throw new Error(s)})),f(this,"getConfigs",(function(t){var r=e.config||"{}";return(0,n.default)(r,t)||{}})),f(this,"generateHeader",(function(t){var r=t.data,n=void 0===r?{}:r,s=t.isJQueryAjax,u=void 0!==s&&s,f=t.url,l=void 0===f?"":f,y=t.name,_=t.httpVersion,g=void 0===_?"":_,x=t.type,b=void 0===x?"":x,w=t.method;u&&(w=b);var m=e.getConfigs(y);if(!m||!m.enabled)return"";e.validates(t);var j=g||p,S=w.toUpperCase(),O=n||"";"object"===c(O)&&(O=JSON.stringify(n));var A=(0,o.default)(O),B="SHA-256=".concat(i.default.stringify(A)),z=v(l),T=d(),C="x-date: ".concat(T,"\n").concat(S," ").concat(z," ").concat(j,"\ndigest: ").concat(B),P=(0,a.default)(C,m.consumerSecret),H=i.default.stringify(P);return{"Oka-Authorization":'hmac username="'.concat(m.username,'", algorithm="').concat(h,'", headers="x-date request-line digest", signature="').concat(H,'"'),Digest:B,Date:T,method:w}})),this.config=r}},8249:function(t,e,r){var n;t.exports=n=n||function(t,e){var n;if("undefined"!=typeof window&&window.crypto&&(n=window.crypto),"undefined"!=typeof self&&self.crypto&&(n=self.crypto),"undefined"!=typeof globalThis&&globalThis.crypto&&(n=globalThis.crypto),!n&&"undefined"!=typeof window&&window.msCrypto&&(n=window.msCrypto),!n&&void 0!==r.g&&r.g.crypto&&(n=r.g.crypto),!n)try{n=r(2480)}catch(t){}var o=function(){if(n){if("function"==typeof n.getRandomValues)try{return n.getRandomValues(new Uint32Array(1))[0]}catch(t){}if("function"==typeof n.randomBytes)try{return n.randomBytes(4).readInt32LE()}catch(t){}}throw new Error("Native crypto module could not be used to get secure random number.")},i=Object.create||function(){function t(){}return function(e){var r;return t.prototype=e,r=new t,t.prototype=null,r}}(),a={},s=a.lib={},c=s.Base={extend:function(t){var e=i(this);return t&&e.mixIn(t),e.hasOwnProperty("init")&&this.init!==e.init||(e.init=function(){e.$super.init.apply(this,arguments)}),e.init.prototype=e,e.$super=this,e},create:function(){var t=this.extend();return t.init.apply(t,arguments),t},init:function(){},mixIn:function(t){for(var e in t)t.hasOwnProperty(e)&&(this[e]=t[e]);t.hasOwnProperty("toString")&&(this.toString=t.toString)},clone:function(){return this.init.prototype.extend(this)}},u=s.WordArray=c.extend({init:function(t,e){t=this.words=t||[],this.sigBytes=null!=e?e:4*t.length},toString:function(t){return(t||p).stringify(this)},concat:function(t){var e=this.words,r=t.words,n=this.sigBytes,o=t.sigBytes;if(this.clamp(),n%4)for(var i=0;i<o;i++){var a=r[i>>>2]>>>24-i%4*8&255;e[n+i>>>2]|=a<<24-(n+i)%4*8}else for(var s=0;s<o;s+=4)e[n+s>>>2]=r[s>>>2];return this.sigBytes+=o,this},clamp:function(){var e=this.words,r=this.sigBytes;e[r>>>2]&=4294967295<<32-r%4*8,e.length=t.ceil(r/4)},clone:function(){var t=c.clone.call(this);return t.words=this.words.slice(0),t},random:function(t){for(var e=[],r=0;r<t;r+=4)e.push(o());return new u.init(e,t)}}),f=a.enc={},p=f.Hex={stringify:function(t){for(var e=t.words,r=t.sigBytes,n=[],o=0;o<r;o++){var i=e[o>>>2]>>>24-o%4*8&255;n.push((i>>>4).toString(16)),n.push((15&i).toString(16))}return n.join("")},parse:function(t){for(var e=t.length,r=[],n=0;n<e;n+=2)r[n>>>3]|=parseInt(t.substr(n,2),16)<<24-n%8*4;return new u.init(r,e/2)}},h=f.Latin1={stringify:function(t){for(var e=t.words,r=t.sigBytes,n=[],o=0;o<r;o++){var i=e[o>>>2]>>>24-o%4*8&255;n.push(String.fromCharCode(i))}return n.join("")},parse:function(t){for(var e=t.length,r=[],n=0;n<e;n++)r[n>>>2]|=(255&t.charCodeAt(n))<<24-n%4*8;return new u.init(r,e)}},l=f.Utf8={stringify:function(t){try{return decodeURIComponent(escape(h.stringify(t)))}catch(t){throw new Error("Malformed UTF-8 data")}},parse:function(t){return h.parse(unescape(encodeURIComponent(t)))}},d=s.BufferedBlockAlgorithm=c.extend({reset:function(){this._data=new u.init,this._nDataBytes=0},_append:function(t){"string"==typeof t&&(t=l.parse(t)),this._data.concat(t),this._nDataBytes+=t.sigBytes},_process:function(e){var r,n=this._data,o=n.words,i=n.sigBytes,a=this.blockSize,s=i/(4*a),c=(s=e?t.ceil(s):t.max((0|s)-this._minBufferSize,0))*a,f=t.min(4*c,i);if(c){for(var p=0;p<c;p+=a)this._doProcessBlock(o,p);r=o.splice(0,c),n.sigBytes-=f}return new u.init(r,f)},clone:function(){var t=c.clone.call(this);return t._data=this._data.clone(),t},_minBufferSize:0}),v=(s.Hasher=d.extend({cfg:c.extend(),init:function(t){this.cfg=this.cfg.extend(t),this.reset()},reset:function(){d.reset.call(this),this._doReset()},update:function(t){return this._append(t),this._process(),this},finalize:function(t){return t&&this._append(t),this._doFinalize()},blockSize:16,_createHelper:function(t){return function(e,r){return new t.init(r).finalize(e)}},_createHmacHelper:function(t){return function(e,r){return new v.HMAC.init(t,r).finalize(e)}}}),a.algo={});return a}(Math)},8269:function(t,e,r){var n,o,i;t.exports=(n=r(8249),i=(o=n).lib.WordArray,o.enc.Base64={stringify:function(t){var e=t.words,r=t.sigBytes,n=this._map;t.clamp();for(var o=[],i=0;i<r;i+=3)for(var a=(e[i>>>2]>>>24-i%4*8&255)<<16|(e[i+1>>>2]>>>24-(i+1)%4*8&255)<<8|e[i+2>>>2]>>>24-(i+2)%4*8&255,s=0;s<4&&i+.75*s<r;s++)o.push(n.charAt(a>>>6*(3-s)&63));var c=n.charAt(64);if(c)for(;o.length%4;)o.push(c);return o.join("")},parse:function(t){var e=t.length,r=this._map,n=this._reverseMap;if(!n){n=this._reverseMap=[];for(var o=0;o<r.length;o++)n[r.charCodeAt(o)]=o}var a=r.charAt(64);if(a){var s=t.indexOf(a);-1!==s&&(e=s)}return function(t,e,r){for(var n=[],o=0,a=0;a<e;a++)if(a%4){var s=r[t.charCodeAt(a-1)]<<a%4*2|r[t.charCodeAt(a)]>>>6-a%4*2;n[o>>>2]|=s<<24-o%4*8,o++}return i.create(n,o)}(t,e,n)},_map:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="},n.enc.Base64)},8010:function(t,e,r){var n;t.exports=(n=r(8249),r(2153),r(9824),n.HmacSHA256)},9824:function(t,e,r){var n,o,i;t.exports=(o=(n=r(8249)).lib.Base,i=n.enc.Utf8,void(n.algo.HMAC=o.extend({init:function(t,e){t=this._hasher=new t.init,"string"==typeof e&&(e=i.parse(e));var r=t.blockSize,n=4*r;e.sigBytes>n&&(e=t.finalize(e)),e.clamp();for(var o=this._oKey=e.clone(),a=this._iKey=e.clone(),s=o.words,c=a.words,u=0;u<r;u++)s[u]^=1549556828,c[u]^=909522486;o.sigBytes=a.sigBytes=n,this.reset()},reset:function(){var t=this._hasher;t.reset(),t.update(this._iKey)},update:function(t){return this._hasher.update(t),this},finalize:function(t){var e=this._hasher,r=e.finalize(t);return e.reset(),e.finalize(this._oKey.clone().concat(r))}})))},2153:function(t,e,r){var n;t.exports=(n=r(8249),function(t){var e=n,r=e.lib,o=r.WordArray,i=r.Hasher,a=e.algo,s=[],c=[];!function(){function e(e){for(var r=t.sqrt(e),n=2;n<=r;n++)if(!(e%n))return!1;return!0}function r(t){return 4294967296*(t-(0|t))|0}for(var n=2,o=0;o<64;)e(n)&&(o<8&&(s[o]=r(t.pow(n,.5))),c[o]=r(t.pow(n,1/3)),o++),n++}();var u=[],f=a.SHA256=i.extend({_doReset:function(){this._hash=new o.init(s.slice(0))},_doProcessBlock:function(t,e){for(var r=this._hash.words,n=r[0],o=r[1],i=r[2],a=r[3],s=r[4],f=r[5],p=r[6],h=r[7],l=0;l<64;l++){if(l<16)u[l]=0|t[e+l];else{var d=u[l-15],v=(d<<25|d>>>7)^(d<<14|d>>>18)^d>>>3,y=u[l-2],_=(y<<15|y>>>17)^(y<<13|y>>>19)^y>>>10;u[l]=v+u[l-7]+_+u[l-16]}var g=n&o^n&i^o&i,x=(n<<30|n>>>2)^(n<<19|n>>>13)^(n<<10|n>>>22),b=h+((s<<26|s>>>6)^(s<<21|s>>>11)^(s<<7|s>>>25))+(s&f^~s&p)+c[l]+u[l];h=p,p=f,f=s,s=a+b|0,a=i,i=o,o=n,n=b+(x+g)|0}r[0]=r[0]+n|0,r[1]=r[1]+o|0,r[2]=r[2]+i|0,r[3]=r[3]+a|0,r[4]=r[4]+s|0,r[5]=r[5]+f|0,r[6]=r[6]+p|0,r[7]=r[7]+h|0},_doFinalize:function(){var e=this._data,r=e.words,n=8*this._nDataBytes,o=8*e.sigBytes;return r[o>>>5]|=128<<24-o%32,r[14+(o+64>>>9<<4)]=t.floor(n/4294967296),r[15+(o+64>>>9<<4)]=n,e.sigBytes=4*r.length,this._process(),this._hash},clone:function(){var t=i.clone.call(this);return t._hash=this._hash.clone(),t}});e.SHA256=i._createHelper(f),e.HmacSHA256=i._createHmacHelper(f)}(Math),n.SHA256)},1989:(t,e,r)=>{var n=r(1789),o=r(401),i=r(7667),a=r(1327),s=r(1866);function c(t){var e=-1,r=null==t?0:t.length;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}c.prototype.clear=n,c.prototype.delete=o,c.prototype.get=i,c.prototype.has=a,c.prototype.set=s,t.exports=c},8407:(t,e,r)=>{var n=r(7040),o=r(4125),i=r(2117),a=r(7518),s=r(4705);function c(t){var e=-1,r=null==t?0:t.length;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}c.prototype.clear=n,c.prototype.delete=o,c.prototype.get=i,c.prototype.has=a,c.prototype.set=s,t.exports=c},7071:(t,e,r)=>{var n=r(852)(r(5639),"Map");t.exports=n},3369:(t,e,r)=>{var n=r(4785),o=r(1285),i=r(6e3),a=r(9916),s=r(5265);function c(t){var e=-1,r=null==t?0:t.length;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}c.prototype.clear=n,c.prototype.delete=o,c.prototype.get=i,c.prototype.has=a,c.prototype.set=s,t.exports=c},2705:(t,e,r)=>{var n=r(5639).Symbol;t.exports=n},9932:t=>{t.exports=function(t,e){for(var r=-1,n=null==t?0:t.length,o=Array(n);++r<n;)o[r]=e(t[r],r,t);return o}},8470:(t,e,r)=>{var n=r(7813);t.exports=function(t,e){for(var r=t.length;r--;)if(n(t[r][0],e))return r;return-1}},7786:(t,e,r)=>{var n=r(1811),o=r(327);t.exports=function(t,e){for(var r=0,i=(e=n(e,t)).length;null!=t&&r<i;)t=t[o(e[r++])];return r&&r==i?t:void 0}},4239:(t,e,r)=>{var n=r(2705),o=r(9607),i=r(2333),a=n?n.toStringTag:void 0;t.exports=function(t){return null==t?void 0===t?"[object Undefined]":"[object Null]":a&&a in Object(t)?o(t):i(t)}},8458:(t,e,r)=>{var n=r(3560),o=r(5346),i=r(3218),a=r(346),s=/^\[object .+?Constructor\]$/,c=Function.prototype,u=Object.prototype,f=c.toString,p=u.hasOwnProperty,h=RegExp("^"+f.call(p).replace(/[\\^$.*+?()[\]{}|]/g,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");t.exports=function(t){return!(!i(t)||o(t))&&(n(t)?h:s).test(a(t))}},531:(t,e,r)=>{var n=r(2705),o=r(9932),i=r(1469),a=r(3448),s=n?n.prototype:void 0,c=s?s.toString:void 0;t.exports=function t(e){if("string"==typeof e)return e;if(i(e))return o(e,t)+"";if(a(e))return c?c.call(e):"";var r=e+"";return"0"==r&&1/e==-1/0?"-0":r}},1811:(t,e,r)=>{var n=r(1469),o=r(5403),i=r(5514),a=r(9833);t.exports=function(t,e){return n(t)?t:o(t,e)?[t]:i(a(t))}},4429:(t,e,r)=>{var n=r(5639)["__core-js_shared__"];t.exports=n},1957:(t,e,r)=>{var n="object"==typeof r.g&&r.g&&r.g.Object===Object&&r.g;t.exports=n},5050:(t,e,r)=>{var n=r(7019);t.exports=function(t,e){var r=t.__data__;return n(e)?r["string"==typeof e?"string":"hash"]:r.map}},852:(t,e,r)=>{var n=r(8458),o=r(7801);t.exports=function(t,e){var r=o(t,e);return n(r)?r:void 0}},9607:(t,e,r)=>{var n=r(2705),o=Object.prototype,i=o.hasOwnProperty,a=o.toString,s=n?n.toStringTag:void 0;t.exports=function(t){var e=i.call(t,s),r=t[s];try{t[s]=void 0;var n=!0}catch(t){}var o=a.call(t);return n&&(e?t[s]=r:delete t[s]),o}},7801:t=>{t.exports=function(t,e){return null==t?void 0:t[e]}},1789:(t,e,r)=>{var n=r(4536);t.exports=function(){this.__data__=n?n(null):{},this.size=0}},401:t=>{t.exports=function(t){var e=this.has(t)&&delete this.__data__[t];return this.size-=e?1:0,e}},7667:(t,e,r)=>{var n=r(4536),o=Object.prototype.hasOwnProperty;t.exports=function(t){var e=this.__data__;if(n){var r=e[t];return"__lodash_hash_undefined__"===r?void 0:r}return o.call(e,t)?e[t]:void 0}},1327:(t,e,r)=>{var n=r(4536),o=Object.prototype.hasOwnProperty;t.exports=function(t){var e=this.__data__;return n?void 0!==e[t]:o.call(e,t)}},1866:(t,e,r)=>{var n=r(4536);t.exports=function(t,e){var r=this.__data__;return this.size+=this.has(t)?0:1,r[t]=n&&void 0===e?"__lodash_hash_undefined__":e,this}},5403:(t,e,r)=>{var n=r(1469),o=r(3448),i=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,a=/^\w*$/;t.exports=function(t,e){if(n(t))return!1;var r=typeof t;return!("number"!=r&&"symbol"!=r&&"boolean"!=r&&null!=t&&!o(t))||a.test(t)||!i.test(t)||null!=e&&t in Object(e)}},7019:t=>{t.exports=function(t){var e=typeof t;return"string"==e||"number"==e||"symbol"==e||"boolean"==e?"__proto__"!==t:null===t}},5346:(t,e,r)=>{var n,o=r(4429),i=(n=/[^.]+$/.exec(o&&o.keys&&o.keys.IE_PROTO||""))?"Symbol(src)_1."+n:"";t.exports=function(t){return!!i&&i in t}},7040:t=>{t.exports=function(){this.__data__=[],this.size=0}},4125:(t,e,r)=>{var n=r(8470),o=Array.prototype.splice;t.exports=function(t){var e=this.__data__,r=n(e,t);return!(r<0||(r==e.length-1?e.pop():o.call(e,r,1),--this.size,0))}},2117:(t,e,r)=>{var n=r(8470);t.exports=function(t){var e=this.__data__,r=n(e,t);return r<0?void 0:e[r][1]}},7518:(t,e,r)=>{var n=r(8470);t.exports=function(t){return n(this.__data__,t)>-1}},4705:(t,e,r)=>{var n=r(8470);t.exports=function(t,e){var r=this.__data__,o=n(r,t);return o<0?(++this.size,r.push([t,e])):r[o][1]=e,this}},4785:(t,e,r)=>{var n=r(1989),o=r(8407),i=r(7071);t.exports=function(){this.size=0,this.__data__={hash:new n,map:new(i||o),string:new n}}},1285:(t,e,r)=>{var n=r(5050);t.exports=function(t){var e=n(this,t).delete(t);return this.size-=e?1:0,e}},6e3:(t,e,r)=>{var n=r(5050);t.exports=function(t){return n(this,t).get(t)}},9916:(t,e,r)=>{var n=r(5050);t.exports=function(t){return n(this,t).has(t)}},5265:(t,e,r)=>{var n=r(5050);t.exports=function(t,e){var r=n(this,t),o=r.size;return r.set(t,e),this.size+=r.size==o?0:1,this}},4523:(t,e,r)=>{var n=r(8306);t.exports=function(t){var e=n(t,(function(t){return 500===r.size&&r.clear(),t})),r=e.cache;return e}},4536:(t,e,r)=>{var n=r(852)(Object,"create");t.exports=n},2333:t=>{var e=Object.prototype.toString;t.exports=function(t){return e.call(t)}},5639:(t,e,r)=>{var n=r(1957),o="object"==typeof self&&self&&self.Object===Object&&self,i=n||o||Function("return this")();t.exports=i},5514:(t,e,r)=>{var n=r(4523),o=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,i=/\\(\\)?/g,a=n((function(t){var e=[];return 46===t.charCodeAt(0)&&e.push(""),t.replace(o,(function(t,r,n,o){e.push(n?o.replace(i,"$1"):r||t)})),e}));t.exports=a},327:(t,e,r)=>{var n=r(3448);t.exports=function(t){if("string"==typeof t||n(t))return t;var e=t+"";return"0"==e&&1/t==-1/0?"-0":e}},346:t=>{var e=Function.prototype.toString;t.exports=function(t){if(null!=t){try{return e.call(t)}catch(t){}try{return t+""}catch(t){}}return""}},7813:t=>{t.exports=function(t,e){return t===e||t!=t&&e!=e}},7361:(t,e,r)=>{var n=r(7786);t.exports=function(t,e,r){var o=null==t?void 0:n(t,e);return void 0===o?r:o}},1469:t=>{var e=Array.isArray;t.exports=e},3560:(t,e,r)=>{var n=r(4239),o=r(3218);t.exports=function(t){if(!o(t))return!1;var e=n(t);return"[object Function]"==e||"[object GeneratorFunction]"==e||"[object AsyncFunction]"==e||"[object Proxy]"==e}},3218:t=>{t.exports=function(t){var e=typeof t;return null!=t&&("object"==e||"function"==e)}},7005:t=>{t.exports=function(t){return null!=t&&"object"==typeof t}},3448:(t,e,r)=>{var n=r(4239),o=r(7005);t.exports=function(t){return"symbol"==typeof t||o(t)&&"[object Symbol]"==n(t)}},8306:(t,e,r)=>{var n=r(3369);function o(t,e){if("function"!=typeof t||null!=e&&"function"!=typeof e)throw new TypeError("Expected a function");var r=function(){var n=arguments,o=e?e.apply(this,n):n[0],i=r.cache;if(i.has(o))return i.get(o);var a=t.apply(this,n);return r.cache=i.set(o,a)||i,a};return r.cache=new(o.Cache||n),r}o.Cache=n,t.exports=o},9833:(t,e,r)=>{var n=r(531);t.exports=function(t){return null==t?"":n(t)}},2480:()=>{}},e={};function r(n){var o=e[n];if(void 0!==o)return o.exports;var i=e[n]={exports:{}};return t[n].call(i.exports,i,i.exports,r),i.exports}r.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}();var n={};return(()=>{"use strict";var t=n;Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"OkaHMAC",{enumerable:!0,get:function(){return o.default}});var e,o=(e=r(3233))&&e.__esModule?e:{default:e}})(),n})()}));