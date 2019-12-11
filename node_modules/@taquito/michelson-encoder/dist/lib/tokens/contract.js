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
var ContractToken = /** @class */ (function (_super) {
    __extends(ContractToken, _super);
    function ContractToken(val, idx, fac) {
        var _this = _super.call(this, val, idx, fac) || this;
        _this.val = val;
        _this.idx = idx;
        _this.fac = fac;
        return _this;
    }
    ContractToken.prototype.Execute = function (val) {
        if (val.string) {
            return val.string;
        }
        return utils_1.encodePubKey(val.bytes);
    };
    ContractToken.prototype.Encode = function (args) {
        var val = args.pop();
        return { string: val };
    };
    ContractToken.prototype.EncodeObject = function (val) {
        return { string: val };
    };
    ContractToken.prototype.ExtractSchema = function () {
        return ContractToken.prim;
    };
    ContractToken.prim = 'contract';
    return ContractToken;
}(token_1.Token));
exports.ContractToken = ContractToken;
//# sourceMappingURL=contract.js.map