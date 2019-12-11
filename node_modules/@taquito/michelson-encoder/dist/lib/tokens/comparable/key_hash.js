"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var token_1 = require("../token");
var utils_1 = require("@taquito/utils");
var KeyHashToken = /** @class */ (function (_super) {
    __extends(KeyHashToken, _super);
    function KeyHashToken(val, idx, fac) {
        var _this = _super.call(this, val, idx, fac) || this;
        _this.val = val;
        _this.idx = idx;
        _this.fac = fac;
        return _this;
    }
    KeyHashToken.prototype.Execute = function (val) {
        if (val.string) {
            return val.string;
        }
        return utils_1.encodeKeyHash(val.bytes);
    };
    KeyHashToken.prototype.Encode = function (args) {
        var val = args.pop();
        return { string: val };
    };
    KeyHashToken.prototype.EncodeObject = function (val) {
        return { string: val };
    };
    KeyHashToken.prototype.ExtractSchema = function () {
        return KeyHashToken.prim;
    };
    // tslint:disable-next-line: variable-name
    KeyHashToken.prototype.ToKey = function (_a) {
        var string = _a.string, bytes = _a.bytes;
        if (string) {
            return string;
        }
        return utils_1.encodeKeyHash(bytes);
    };
    KeyHashToken.prototype.ToBigMapKey = function (val) {
        return {
            key: { string: val },
            type: { prim: KeyHashToken.prim },
        };
    };
    KeyHashToken.prim = 'key_hash';
    return KeyHashToken;
}(token_1.Token));
exports.KeyHashToken = KeyHashToken;
//# sourceMappingURL=key_hash.js.map