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
var token_1 = require("./token");
var utils_1 = require("@taquito/utils");
var KeyToken = /** @class */ (function (_super) {
    __extends(KeyToken, _super);
    function KeyToken(val, idx, fac) {
        var _this = _super.call(this, val, idx, fac) || this;
        _this.val = val;
        _this.idx = idx;
        _this.fac = fac;
        return _this;
    }
    KeyToken.prototype.Execute = function (val) {
        if (val.string) {
            return val.string;
        }
        return utils_1.encodeKey(val.bytes);
    };
    KeyToken.prototype.Encode = function (args) {
        var val = args.pop();
        return { string: val };
    };
    KeyToken.prototype.EncodeObject = function (val) {
        return { string: val };
    };
    KeyToken.prototype.ExtractSchema = function () {
        return KeyToken.prim;
    };
    KeyToken.prim = 'key';
    return KeyToken;
}(token_1.Token));
exports.KeyToken = KeyToken;
//# sourceMappingURL=key.js.map