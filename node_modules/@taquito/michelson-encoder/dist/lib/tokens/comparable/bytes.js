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
var BytesToken = /** @class */ (function (_super) {
    __extends(BytesToken, _super);
    function BytesToken(val, idx, fac) {
        var _this = _super.call(this, val, idx, fac) || this;
        _this.val = val;
        _this.idx = idx;
        _this.fac = fac;
        return _this;
    }
    BytesToken.prototype.ToBigMapKey = function (val) {
        return {
            key: { bytes: val },
            type: { prim: BytesToken.prim },
        };
    };
    BytesToken.prototype.Encode = function (args) {
        var val = args.pop();
        return { bytes: String(val).toString() };
    };
    BytesToken.prototype.EncodeObject = function (val) {
        return { bytes: String(val).toString() };
    };
    BytesToken.prototype.Execute = function (val) {
        return val.bytes;
    };
    BytesToken.prototype.ExtractSchema = function () {
        return BytesToken.prim;
    };
    // tslint:disable-next-line: variable-name
    BytesToken.prototype.ToKey = function (_a) {
        var bytes = _a.bytes, string = _a.string;
        if (string) {
            return string;
        }
        return bytes;
    };
    BytesToken.prim = 'bytes';
    return BytesToken;
}(token_1.Token));
exports.BytesToken = BytesToken;
//# sourceMappingURL=bytes.js.map