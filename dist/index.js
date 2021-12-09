!function(t,n){"object"==typeof exports&&"object"==typeof module?module.exports=n():"function"==typeof define&&define.amd?define([],n):"object"==typeof exports?exports['"okadoc-libs']=n():t['"okadoc-libs']=n()}(this,(function(){return function(){var t={3233:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var r=s(e(7361)),o=s(e(1609)),i=s(e(2153)),a=s(e(8269)),c=s(e(8010));function s(t){return t&&t.__esModule?t:{default:t}}function u(t){return(u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function f(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}function p(t,n,e){return n in t?Object.defineProperty(t,n,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[n]=e,t}var l="HTTP/1.1",h="hmac-sha256",d=["GET","POST","UPDATE","DELETE","PUT"],v=function(){return(new Date).toUTCString()},y=function(t){var n=t.match(/^(https?:)\/\/(([^:/?#]*)(?::([0-9]+))?)([/]{0,1}[^?#]*)(\?[^#]*|)(#.*|)$/);return n?n[5]:t},g=function t(){var n=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"{}";f(this,t),p(this,"config",{}),p(this,"methodList",["GET","POST","UPDATE","DELETE","PUT"]),p(this,"setConfig",(function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;if("string"==typeof t)try{n.config=JSON.parse(t)}catch(t){n.config={}}else"object"===u(t)?n.config=t||{}:n.config={}})),p(this,"validates",(function(t){var n=t.url,e=void 0===n?null:n,r=t.method,o=void 0!==r&&r,i=t.type,a=o||void 0!==i&&i||"",c="";e?a||(c="service Method is not defined"):c="service URL is not defined";var s=a.toUpperCase();if(-1===d.indexOf(s)&&(c="invalid service Method"),c)throw new Error(c)})),p(this,"getConfigs",(function(t){var e=n.config||"{}";return(0,r.default)(e,t)||{}})),p(this,"generateHeader",(function(t){var e=t.data,r=t.isJQueryAjax,o=void 0!==r&&r,s=t.baseURL,f=void 0===s?"":s,p=t.url,d=void 0===p?"":p,g=t.name,b=t.httpVersion,_=void 0===b?"":b,x=t.type,j=void 0===x?"":x,w=t.method;o&&(w=j);var m=n.getConfigs(g);if(!m||!m.enabled)return"";n.validates(t);var O=_||l,A=w.toUpperCase(),S=e;"object"===u(S)&&(S=JSON.stringify(e));var B=(0,i.default)(S),z="SHA-256=".concat(a.default.stringify(B)),T=/^http(s)?:\/\/.*$/.test(d),P=o||T?d:"".concat(f).concat(d),C=y(P),H=v(),D="x-date: ".concat(H,"\n").concat(A," ").concat(C," ").concat(O,"\ndigest: ").concat(z),E=(0,c.default)(D,m.consumerSecret),M=a.default.stringify(E),U='hmac username="'.concat(m.username,'", algorithm="').concat(h,'", headers="x-date request-line digest", signature="').concat(M,'"');return n.hmacInfo={xSignature:U,xDigest:z,xDate:H},{"Oka-Authorization":U,Digest:z,Date:H}})),p(this,"updateHeaders",(function(t){var e=n.generateHeader(t);if(!(0,o.default)(e)){var r=n.hmacInfo,i=r.xSignature,a=r.xDigest,c=r.xDate;t.headers["Oka-Authorization"]=i,t.headers.Digest=a,t.headers["X-Date"]=c}})),this.setConfig(e),this.hmacInfo={xDigest:null,xSignature:null,xDate:null}};n.default=g},8249:function(t,n,e){var r;t.exports=(r=r||function(t,n){var r;if("undefined"!=typeof window&&window.crypto&&(r=window.crypto),"undefined"!=typeof self&&self.crypto&&(r=self.crypto),"undefined"!=typeof globalThis&&globalThis.crypto&&(r=globalThis.crypto),!r&&"undefined"!=typeof window&&window.msCrypto&&(r=window.msCrypto),!r&&void 0!==e.g&&e.g.crypto&&(r=e.g.crypto),!r)try{r=e(2480)}catch(t){}var o=function(){if(r){if("function"==typeof r.getRandomValues)try{return r.getRandomValues(new Uint32Array(1))[0]}catch(t){}if("function"==typeof r.randomBytes)try{return r.randomBytes(4).readInt32LE()}catch(t){}}throw new Error("Native crypto module could not be used to get secure random number.")},i=Object.create||function(){function t(){}return function(n){var e;return t.prototype=n,e=new t,t.prototype=null,e}}(),a={},c=a.lib={},s=c.Base={extend:function(t){var n=i(this);return t&&n.mixIn(t),n.hasOwnProperty("init")&&this.init!==n.init||(n.init=function(){n.$super.init.apply(this,arguments)}),n.init.prototype=n,n.$super=this,n},create:function(){var t=this.extend();return t.init.apply(t,arguments),t},init:function(){},mixIn:function(t){for(var n in t)t.hasOwnProperty(n)&&(this[n]=t[n]);t.hasOwnProperty("toString")&&(this.toString=t.toString)},clone:function(){return this.init.prototype.extend(this)}},u=c.WordArray=s.extend({init:function(t,e){t=this.words=t||[],this.sigBytes=e!=n?e:4*t.length},toString:function(t){return(t||p).stringify(this)},concat:function(t){var n=this.words,e=t.words,r=this.sigBytes,o=t.sigBytes;if(this.clamp(),r%4)for(var i=0;i<o;i++){var a=e[i>>>2]>>>24-i%4*8&255;n[r+i>>>2]|=a<<24-(r+i)%4*8}else for(var c=0;c<o;c+=4)n[r+c>>>2]=e[c>>>2];return this.sigBytes+=o,this},clamp:function(){var n=this.words,e=this.sigBytes;n[e>>>2]&=4294967295<<32-e%4*8,n.length=t.ceil(e/4)},clone:function(){var t=s.clone.call(this);return t.words=this.words.slice(0),t},random:function(t){for(var n=[],e=0;e<t;e+=4)n.push(o());return new u.init(n,t)}}),f=a.enc={},p=f.Hex={stringify:function(t){for(var n=t.words,e=t.sigBytes,r=[],o=0;o<e;o++){var i=n[o>>>2]>>>24-o%4*8&255;r.push((i>>>4).toString(16)),r.push((15&i).toString(16))}return r.join("")},parse:function(t){for(var n=t.length,e=[],r=0;r<n;r+=2)e[r>>>3]|=parseInt(t.substr(r,2),16)<<24-r%8*4;return new u.init(e,n/2)}},l=f.Latin1={stringify:function(t){for(var n=t.words,e=t.sigBytes,r=[],o=0;o<e;o++){var i=n[o>>>2]>>>24-o%4*8&255;r.push(String.fromCharCode(i))}return r.join("")},parse:function(t){for(var n=t.length,e=[],r=0;r<n;r++)e[r>>>2]|=(255&t.charCodeAt(r))<<24-r%4*8;return new u.init(e,n)}},h=f.Utf8={stringify:function(t){try{return decodeURIComponent(escape(l.stringify(t)))}catch(t){throw new Error("Malformed UTF-8 data")}},parse:function(t){return l.parse(unescape(encodeURIComponent(t)))}},d=c.BufferedBlockAlgorithm=s.extend({reset:function(){this._data=new u.init,this._nDataBytes=0},_append:function(t){"string"==typeof t&&(t=h.parse(t)),this._data.concat(t),this._nDataBytes+=t.sigBytes},_process:function(n){var e,r=this._data,o=r.words,i=r.sigBytes,a=this.blockSize,c=i/(4*a),s=(c=n?t.ceil(c):t.max((0|c)-this._minBufferSize,0))*a,f=t.min(4*s,i);if(s){for(var p=0;p<s;p+=a)this._doProcessBlock(o,p);e=o.splice(0,s),r.sigBytes-=f}return new u.init(e,f)},clone:function(){var t=s.clone.call(this);return t._data=this._data.clone(),t},_minBufferSize:0}),v=(c.Hasher=d.extend({cfg:s.extend(),init:function(t){this.cfg=this.cfg.extend(t),this.reset()},reset:function(){d.reset.call(this),this._doReset()},update:function(t){return this._append(t),this._process(),this},finalize:function(t){return t&&this._append(t),this._doFinalize()},blockSize:16,_createHelper:function(t){return function(n,e){return new t.init(e).finalize(n)}},_createHmacHelper:function(t){return function(n,e){return new v.HMAC.init(t,e).finalize(n)}}}),a.algo={});return a}(Math),r)},8269:function(t,n,e){var r;t.exports=(r=e(8249),function(){var t=r,n=t.lib.WordArray;function e(t,e,r){for(var o=[],i=0,a=0;a<e;a++)if(a%4){var c=r[t.charCodeAt(a-1)]<<a%4*2|r[t.charCodeAt(a)]>>>6-a%4*2;o[i>>>2]|=c<<24-i%4*8,i++}return n.create(o,i)}t.enc.Base64={stringify:function(t){var n=t.words,e=t.sigBytes,r=this._map;t.clamp();for(var o=[],i=0;i<e;i+=3)for(var a=(n[i>>>2]>>>24-i%4*8&255)<<16|(n[i+1>>>2]>>>24-(i+1)%4*8&255)<<8|n[i+2>>>2]>>>24-(i+2)%4*8&255,c=0;c<4&&i+.75*c<e;c++)o.push(r.charAt(a>>>6*(3-c)&63));var s=r.charAt(64);if(s)for(;o.length%4;)o.push(s);return o.join("")},parse:function(t){var n=t.length,r=this._map,o=this._reverseMap;if(!o){o=this._reverseMap=[];for(var i=0;i<r.length;i++)o[r.charCodeAt(i)]=i}var a=r.charAt(64);if(a){var c=t.indexOf(a);-1!==c&&(n=c)}return e(t,n,o)},_map:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="}}(),r.enc.Base64)},8010:function(t,n,e){var r;t.exports=(r=e(8249),e(2153),e(9824),r.HmacSHA256)},9824:function(t,n,e){var r,o,i,a;t.exports=(r=e(8249),i=(o=r).lib.Base,a=o.enc.Utf8,void(o.algo.HMAC=i.extend({init:function(t,n){t=this._hasher=new t.init,"string"==typeof n&&(n=a.parse(n));var e=t.blockSize,r=4*e;n.sigBytes>r&&(n=t.finalize(n)),n.clamp();for(var o=this._oKey=n.clone(),i=this._iKey=n.clone(),c=o.words,s=i.words,u=0;u<e;u++)c[u]^=1549556828,s[u]^=909522486;o.sigBytes=i.sigBytes=r,this.reset()},reset:function(){var t=this._hasher;t.reset(),t.update(this._iKey)},update:function(t){return this._hasher.update(t),this},finalize:function(t){var n=this._hasher,e=n.finalize(t);return n.reset(),n.finalize(this._oKey.clone().concat(e))}})))},2153:function(t,n,e){var r;t.exports=(r=e(8249),function(t){var n=r,e=n.lib,o=e.WordArray,i=e.Hasher,a=n.algo,c=[],s=[];!function(){function n(n){for(var e=t.sqrt(n),r=2;r<=e;r++)if(!(n%r))return!1;return!0}function e(t){return 4294967296*(t-(0|t))|0}for(var r=2,o=0;o<64;)n(r)&&(o<8&&(c[o]=e(t.pow(r,.5))),s[o]=e(t.pow(r,1/3)),o++),r++}();var u=[],f=a.SHA256=i.extend({_doReset:function(){this._hash=new o.init(c.slice(0))},_doProcessBlock:function(t,n){for(var e=this._hash.words,r=e[0],o=e[1],i=e[2],a=e[3],c=e[4],f=e[5],p=e[6],l=e[7],h=0;h<64;h++){if(h<16)u[h]=0|t[n+h];else{var d=u[h-15],v=(d<<25|d>>>7)^(d<<14|d>>>18)^d>>>3,y=u[h-2],g=(y<<15|y>>>17)^(y<<13|y>>>19)^y>>>10;u[h]=v+u[h-7]+g+u[h-16]}var b=r&o^r&i^o&i,_=(r<<30|r>>>2)^(r<<19|r>>>13)^(r<<10|r>>>22),x=l+((c<<26|c>>>6)^(c<<21|c>>>11)^(c<<7|c>>>25))+(c&f^~c&p)+s[h]+u[h];l=p,p=f,f=c,c=a+x|0,a=i,i=o,o=r,r=x+(_+b)|0}e[0]=e[0]+r|0,e[1]=e[1]+o|0,e[2]=e[2]+i|0,e[3]=e[3]+a|0,e[4]=e[4]+c|0,e[5]=e[5]+f|0,e[6]=e[6]+p|0,e[7]=e[7]+l|0},_doFinalize:function(){var n=this._data,e=n.words,r=8*this._nDataBytes,o=8*n.sigBytes;return e[o>>>5]|=128<<24-o%32,e[14+(o+64>>>9<<4)]=t.floor(r/4294967296),e[15+(o+64>>>9<<4)]=r,n.sigBytes=4*e.length,this._process(),this._hash},clone:function(){var t=i.clone.call(this);return t._hash=this._hash.clone(),t}});n.SHA256=i._createHelper(f),n.HmacSHA256=i._createHmacHelper(f)}(Math),r.SHA256)},8552:function(t,n,e){var r=e(852)(e(5639),"DataView");t.exports=r},1989:function(t,n,e){var r=e(1789),o=e(401),i=e(7667),a=e(1327),c=e(1866);function s(t){var n=-1,e=null==t?0:t.length;for(this.clear();++n<e;){var r=t[n];this.set(r[0],r[1])}}s.prototype.clear=r,s.prototype.delete=o,s.prototype.get=i,s.prototype.has=a,s.prototype.set=c,t.exports=s},8407:function(t,n,e){var r=e(7040),o=e(4125),i=e(2117),a=e(7518),c=e(4705);function s(t){var n=-1,e=null==t?0:t.length;for(this.clear();++n<e;){var r=t[n];this.set(r[0],r[1])}}s.prototype.clear=r,s.prototype.delete=o,s.prototype.get=i,s.prototype.has=a,s.prototype.set=c,t.exports=s},7071:function(t,n,e){var r=e(852)(e(5639),"Map");t.exports=r},3369:function(t,n,e){var r=e(4785),o=e(1285),i=e(6e3),a=e(9916),c=e(5265);function s(t){var n=-1,e=null==t?0:t.length;for(this.clear();++n<e;){var r=t[n];this.set(r[0],r[1])}}s.prototype.clear=r,s.prototype.delete=o,s.prototype.get=i,s.prototype.has=a,s.prototype.set=c,t.exports=s},3818:function(t,n,e){var r=e(852)(e(5639),"Promise");t.exports=r},8525:function(t,n,e){var r=e(852)(e(5639),"Set");t.exports=r},2705:function(t,n,e){var r=e(5639).Symbol;t.exports=r},577:function(t,n,e){var r=e(852)(e(5639),"WeakMap");t.exports=r},9932:function(t){t.exports=function(t,n){for(var e=-1,r=null==t?0:t.length,o=Array(r);++e<r;)o[e]=n(t[e],e,t);return o}},8470:function(t,n,e){var r=e(7813);t.exports=function(t,n){for(var e=t.length;e--;)if(r(t[e][0],n))return e;return-1}},7786:function(t,n,e){var r=e(1811),o=e(327);t.exports=function(t,n){for(var e=0,i=(n=r(n,t)).length;null!=t&&e<i;)t=t[o(n[e++])];return e&&e==i?t:void 0}},4239:function(t,n,e){var r=e(2705),o=e(9607),i=e(2333),a=r?r.toStringTag:void 0;t.exports=function(t){return null==t?void 0===t?"[object Undefined]":"[object Null]":a&&a in Object(t)?o(t):i(t)}},9454:function(t,n,e){var r=e(4239),o=e(7005);t.exports=function(t){return o(t)&&"[object Arguments]"==r(t)}},8458:function(t,n,e){var r=e(3560),o=e(5346),i=e(3218),a=e(346),c=/^\[object .+?Constructor\]$/,s=Function.prototype,u=Object.prototype,f=s.toString,p=u.hasOwnProperty,l=RegExp("^"+f.call(p).replace(/[\\^$.*+?()[\]{}|]/g,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");t.exports=function(t){return!(!i(t)||o(t))&&(r(t)?l:c).test(a(t))}},8749:function(t,n,e){var r=e(4239),o=e(1780),i=e(7005),a={};a["[object Float32Array]"]=a["[object Float64Array]"]=a["[object Int8Array]"]=a["[object Int16Array]"]=a["[object Int32Array]"]=a["[object Uint8Array]"]=a["[object Uint8ClampedArray]"]=a["[object Uint16Array]"]=a["[object Uint32Array]"]=!0,a["[object Arguments]"]=a["[object Array]"]=a["[object ArrayBuffer]"]=a["[object Boolean]"]=a["[object DataView]"]=a["[object Date]"]=a["[object Error]"]=a["[object Function]"]=a["[object Map]"]=a["[object Number]"]=a["[object Object]"]=a["[object RegExp]"]=a["[object Set]"]=a["[object String]"]=a["[object WeakMap]"]=!1,t.exports=function(t){return i(t)&&o(t.length)&&!!a[r(t)]}},280:function(t,n,e){var r=e(5726),o=e(6916),i=Object.prototype.hasOwnProperty;t.exports=function(t){if(!r(t))return o(t);var n=[];for(var e in Object(t))i.call(t,e)&&"constructor"!=e&&n.push(e);return n}},531:function(t,n,e){var r=e(2705),o=e(9932),i=e(1469),a=e(3448),c=r?r.prototype:void 0,s=c?c.toString:void 0;t.exports=function t(n){if("string"==typeof n)return n;if(i(n))return o(n,t)+"";if(a(n))return s?s.call(n):"";var e=n+"";return"0"==e&&1/n==-Infinity?"-0":e}},1717:function(t){t.exports=function(t){return function(n){return t(n)}}},1811:function(t,n,e){var r=e(1469),o=e(5403),i=e(5514),a=e(9833);t.exports=function(t,n){return r(t)?t:o(t,n)?[t]:i(a(t))}},4429:function(t,n,e){var r=e(5639)["__core-js_shared__"];t.exports=r},1957:function(t,n,e){var r="object"==typeof e.g&&e.g&&e.g.Object===Object&&e.g;t.exports=r},5050:function(t,n,e){var r=e(7019);t.exports=function(t,n){var e=t.__data__;return r(n)?e["string"==typeof n?"string":"hash"]:e.map}},852:function(t,n,e){var r=e(8458),o=e(7801);t.exports=function(t,n){var e=o(t,n);return r(e)?e:void 0}},9607:function(t,n,e){var r=e(2705),o=Object.prototype,i=o.hasOwnProperty,a=o.toString,c=r?r.toStringTag:void 0;t.exports=function(t){var n=i.call(t,c),e=t[c];try{t[c]=void 0;var r=!0}catch(t){}var o=a.call(t);return r&&(n?t[c]=e:delete t[c]),o}},4160:function(t,n,e){var r=e(8552),o=e(7071),i=e(3818),a=e(8525),c=e(577),s=e(4239),u=e(346),f="[object Map]",p="[object Promise]",l="[object Set]",h="[object WeakMap]",d="[object DataView]",v=u(r),y=u(o),g=u(i),b=u(a),_=u(c),x=s;(r&&x(new r(new ArrayBuffer(1)))!=d||o&&x(new o)!=f||i&&x(i.resolve())!=p||a&&x(new a)!=l||c&&x(new c)!=h)&&(x=function(t){var n=s(t),e="[object Object]"==n?t.constructor:void 0,r=e?u(e):"";if(r)switch(r){case v:return d;case y:return f;case g:return p;case b:return l;case _:return h}return n}),t.exports=x},7801:function(t){t.exports=function(t,n){return null==t?void 0:t[n]}},1789:function(t,n,e){var r=e(4536);t.exports=function(){this.__data__=r?r(null):{},this.size=0}},401:function(t){t.exports=function(t){var n=this.has(t)&&delete this.__data__[t];return this.size-=n?1:0,n}},7667:function(t,n,e){var r=e(4536),o=Object.prototype.hasOwnProperty;t.exports=function(t){var n=this.__data__;if(r){var e=n[t];return"__lodash_hash_undefined__"===e?void 0:e}return o.call(n,t)?n[t]:void 0}},1327:function(t,n,e){var r=e(4536),o=Object.prototype.hasOwnProperty;t.exports=function(t){var n=this.__data__;return r?void 0!==n[t]:o.call(n,t)}},1866:function(t,n,e){var r=e(4536);t.exports=function(t,n){var e=this.__data__;return this.size+=this.has(t)?0:1,e[t]=r&&void 0===n?"__lodash_hash_undefined__":n,this}},5403:function(t,n,e){var r=e(1469),o=e(3448),i=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,a=/^\w*$/;t.exports=function(t,n){if(r(t))return!1;var e=typeof t;return!("number"!=e&&"symbol"!=e&&"boolean"!=e&&null!=t&&!o(t))||(a.test(t)||!i.test(t)||null!=n&&t in Object(n))}},7019:function(t){t.exports=function(t){var n=typeof t;return"string"==n||"number"==n||"symbol"==n||"boolean"==n?"__proto__"!==t:null===t}},5346:function(t,n,e){var r,o=e(4429),i=(r=/[^.]+$/.exec(o&&o.keys&&o.keys.IE_PROTO||""))?"Symbol(src)_1."+r:"";t.exports=function(t){return!!i&&i in t}},5726:function(t){var n=Object.prototype;t.exports=function(t){var e=t&&t.constructor;return t===("function"==typeof e&&e.prototype||n)}},7040:function(t){t.exports=function(){this.__data__=[],this.size=0}},4125:function(t,n,e){var r=e(8470),o=Array.prototype.splice;t.exports=function(t){var n=this.__data__,e=r(n,t);return!(e<0)&&(e==n.length-1?n.pop():o.call(n,e,1),--this.size,!0)}},2117:function(t,n,e){var r=e(8470);t.exports=function(t){var n=this.__data__,e=r(n,t);return e<0?void 0:n[e][1]}},7518:function(t,n,e){var r=e(8470);t.exports=function(t){return r(this.__data__,t)>-1}},4705:function(t,n,e){var r=e(8470);t.exports=function(t,n){var e=this.__data__,o=r(e,t);return o<0?(++this.size,e.push([t,n])):e[o][1]=n,this}},4785:function(t,n,e){var r=e(1989),o=e(8407),i=e(7071);t.exports=function(){this.size=0,this.__data__={hash:new r,map:new(i||o),string:new r}}},1285:function(t,n,e){var r=e(5050);t.exports=function(t){var n=r(this,t).delete(t);return this.size-=n?1:0,n}},6e3:function(t,n,e){var r=e(5050);t.exports=function(t){return r(this,t).get(t)}},9916:function(t,n,e){var r=e(5050);t.exports=function(t){return r(this,t).has(t)}},5265:function(t,n,e){var r=e(5050);t.exports=function(t,n){var e=r(this,t),o=e.size;return e.set(t,n),this.size+=e.size==o?0:1,this}},4523:function(t,n,e){var r=e(8306);t.exports=function(t){var n=r(t,(function(t){return 500===e.size&&e.clear(),t})),e=n.cache;return n}},4536:function(t,n,e){var r=e(852)(Object,"create");t.exports=r},6916:function(t,n,e){var r=e(5569)(Object.keys,Object);t.exports=r},1167:function(t,n,e){t=e.nmd(t);var r=e(1957),o=n&&!n.nodeType&&n,i=o&&t&&!t.nodeType&&t,a=i&&i.exports===o&&r.process,c=function(){try{var t=i&&i.require&&i.require("util").types;return t||a&&a.binding&&a.binding("util")}catch(t){}}();t.exports=c},2333:function(t){var n=Object.prototype.toString;t.exports=function(t){return n.call(t)}},5569:function(t){t.exports=function(t,n){return function(e){return t(n(e))}}},5639:function(t,n,e){var r=e(1957),o="object"==typeof self&&self&&self.Object===Object&&self,i=r||o||Function("return this")();t.exports=i},5514:function(t,n,e){var r=e(4523),o=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,i=/\\(\\)?/g,a=r((function(t){var n=[];return 46===t.charCodeAt(0)&&n.push(""),t.replace(o,(function(t,e,r,o){n.push(r?o.replace(i,"$1"):e||t)})),n}));t.exports=a},327:function(t,n,e){var r=e(3448);t.exports=function(t){if("string"==typeof t||r(t))return t;var n=t+"";return"0"==n&&1/t==-Infinity?"-0":n}},346:function(t){var n=Function.prototype.toString;t.exports=function(t){if(null!=t){try{return n.call(t)}catch(t){}try{return t+""}catch(t){}}return""}},7813:function(t){t.exports=function(t,n){return t===n||t!=t&&n!=n}},7361:function(t,n,e){var r=e(7786);t.exports=function(t,n,e){var o=null==t?void 0:r(t,n);return void 0===o?e:o}},5694:function(t,n,e){var r=e(9454),o=e(7005),i=Object.prototype,a=i.hasOwnProperty,c=i.propertyIsEnumerable,s=r(function(){return arguments}())?r:function(t){return o(t)&&a.call(t,"callee")&&!c.call(t,"callee")};t.exports=s},1469:function(t){var n=Array.isArray;t.exports=n},8612:function(t,n,e){var r=e(3560),o=e(1780);t.exports=function(t){return null!=t&&o(t.length)&&!r(t)}},4144:function(t,n,e){t=e.nmd(t);var r=e(5639),o=e(5062),i=n&&!n.nodeType&&n,a=i&&t&&!t.nodeType&&t,c=a&&a.exports===i?r.Buffer:void 0,s=(c?c.isBuffer:void 0)||o;t.exports=s},1609:function(t,n,e){var r=e(280),o=e(4160),i=e(5694),a=e(1469),c=e(8612),s=e(4144),u=e(5726),f=e(6719),p=Object.prototype.hasOwnProperty;t.exports=function(t){if(null==t)return!0;if(c(t)&&(a(t)||"string"==typeof t||"function"==typeof t.splice||s(t)||f(t)||i(t)))return!t.length;var n=o(t);if("[object Map]"==n||"[object Set]"==n)return!t.size;if(u(t))return!r(t).length;for(var e in t)if(p.call(t,e))return!1;return!0}},3560:function(t,n,e){var r=e(4239),o=e(3218);t.exports=function(t){if(!o(t))return!1;var n=r(t);return"[object Function]"==n||"[object GeneratorFunction]"==n||"[object AsyncFunction]"==n||"[object Proxy]"==n}},1780:function(t){t.exports=function(t){return"number"==typeof t&&t>-1&&t%1==0&&t<=9007199254740991}},3218:function(t){t.exports=function(t){var n=typeof t;return null!=t&&("object"==n||"function"==n)}},7005:function(t){t.exports=function(t){return null!=t&&"object"==typeof t}},3448:function(t,n,e){var r=e(4239),o=e(7005);t.exports=function(t){return"symbol"==typeof t||o(t)&&"[object Symbol]"==r(t)}},6719:function(t,n,e){var r=e(8749),o=e(1717),i=e(1167),a=i&&i.isTypedArray,c=a?o(a):r;t.exports=c},8306:function(t,n,e){var r=e(3369);function o(t,n){if("function"!=typeof t||null!=n&&"function"!=typeof n)throw new TypeError("Expected a function");var e=function(){var r=arguments,o=n?n.apply(this,r):r[0],i=e.cache;if(i.has(o))return i.get(o);var a=t.apply(this,r);return e.cache=i.set(o,a)||i,a};return e.cache=new(o.Cache||r),e}o.Cache=r,t.exports=o},5062:function(t){t.exports=function(){return!1}},9833:function(t,n,e){var r=e(531);t.exports=function(t){return null==t?"":r(t)}},2480:function(){}},n={};function e(r){var o=n[r];if(void 0!==o)return o.exports;var i=n[r]={id:r,loaded:!1,exports:{}};return t[r].call(i.exports,i,i.exports,e),i.loaded=!0,i.exports}e.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),e.nmd=function(t){return t.paths=[],t.children||(t.children=[]),t};var r={};return function(){"use strict";var t=r;Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"OkaHMAC",{enumerable:!0,get:function(){return o.default}});var n,o=(n=e(3233))&&n.__esModule?n:{default:n}}(),r}()}));