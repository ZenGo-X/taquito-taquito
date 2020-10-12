"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./status_code"));
var defaultTimeout = 30000;
var HttpResponseError = /** @class */ (function () {
    function HttpResponseError(message, status, statusText, body) {
        this.message = message;
        this.status = status;
        this.statusText = statusText;
        this.body = body;
        this.name = 'HttpResponse';
    }
    return HttpResponseError;
}());
exports.HttpResponseError = HttpResponseError;
var HttpRequestFailed = /** @class */ (function () {
    function HttpRequestFailed(url, innerEvent) {
        this.url = url;
        this.innerEvent = innerEvent;
        this.name = 'HttpRequestFailed';
        this.message = "Request to " + url + " failed";
    }
    return HttpRequestFailed;
}());
exports.HttpRequestFailed = HttpRequestFailed;
var HttpBackend = /** @class */ (function () {
    function HttpBackend() {
    }
    HttpBackend.prototype.serialize = function (obj) {
        if (!obj) {
            return '';
        }
        var str = [];
        var _loop_1 = function (p) {
            if (obj.hasOwnProperty(p) && obj[p]) {
                var prop = typeof obj[p].toJSON === 'function' ? obj[p].toJSON() : obj[p];
                // query arguments can have no value so we need some way of handling that
                // example https://domain.com/query?all
                if (prop === null) {
                    str.push(encodeURIComponent(p));
                    return "continue";
                }
                // another use case is multiple arguments with the same name
                // they are passed as array
                if (Array.isArray(prop)) {
                    prop.forEach(function (item) {
                        str.push(encodeURIComponent(p) + '=' + encodeURIComponent(item));
                    });
                    return "continue";
                }
                str.push(encodeURIComponent(p) + '=' + encodeURIComponent(prop));
            }
        };
        for (var p in obj) {
            _loop_1(p);
        }
        var serialized = str.join('&');
        if (serialized) {
            return "?" + serialized;
        }
        else {
            return '';
        }
    };
    HttpBackend.prototype.createXHR = function () {
        // tslint:disable: strict-type-predicates
        if (typeof process !== 'undefined' &&
            process.versions != null &&
            process.versions.node != null
        // tslint:enable: strict-type-predicates
        ) {
            var NodeXHR = require('xhr2-cookies').XMLHttpRequest;
            var request = new NodeXHR();
            return request;
        }
        else {
            return new XMLHttpRequest();
        }
    };
    /**
     *
     * @param options contains options to be passed for the HTTP request (url, method and timeout)
     */
    HttpBackend.prototype.createRequest = function (_a, data) {
        var _this = this;
        var url = _a.url, method = _a.method, timeout = _a.timeout, query = _a.query;
        return new Promise(function (resolve, reject) {
            var request = _this.createXHR();
            request.open(method || 'GET', "" + url + _this.serialize(query));
            request.setRequestHeader('Content-Type', 'application/json');
            request.timeout = timeout || defaultTimeout;
            request.onload = function () {
                if (this.status >= 200 && this.status < 300) {
                    try {
                        resolve(JSON.parse(request.response));
                    }
                    catch (ex) {
                        reject(new Error("Unable to parse response: " + request.response));
                    }
                }
                else {
                    reject(new HttpResponseError("Http error response: (" + this.status + ") " + request.response, this.status, request.statusText, request.response));
                }
            };
            request.ontimeout = function () {
                reject(new Error("Request timed out after: " + request.timeout + "ms"));
            };
            request.onerror = function (err) {
                reject(new HttpRequestFailed(url, err));
            };
            if (data) {
                var dataStr = JSON.stringify(data);
                request.send(dataStr);
            }
            else {
                request.send();
            }
        });
    };
    return HttpBackend;
}());
exports.HttpBackend = HttpBackend;
//# sourceMappingURL=taquito-http-utils.js.map