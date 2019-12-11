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
var AddressToken = /** @class */ (function (_super) {
    __extends(AddressToken, _super);
    function AddressToken(val, idx, fac) {
        var _this = _super.call(this, val, idx, fac) || this;
        _this.val = val;
        _this.idx = idx;
        _this.fac = fac;
        return _this;
    }
    AddressToken.prototype.ToBigMapKey = function (val) {
        var decoded = utils_1.b58decode(val);
        return {
            key: { bytes: decoded },
            type: { prim: 'bytes' },
        };
    };
    AddressToken.prototype.Encode = function (args) {
        var val = args.pop();
        return { string: val };
    };
    AddressToken.prototype.EncodeObject = function (val) {
        return { string: val };
    };
    // tslint:disable-next-line: variable-name
    AddressToken.prototype.Execute = function (val) {
        if (val.string) {
            return val.string;
        }
        return utils_1.encodePubKey(val.bytes);
    };
    AddressToken.prototype.ExtractSchema = function () {
        return AddressToken.prim;
    };
    // tslint:disable-next-line: variable-name
    AddressToken.prototype.ToKey = function (_a) {
        var bytes = _a.bytes, string = _a.string;
        if (string) {
            return string;
        }
        return utils_1.encodePubKey(bytes);
    };
    AddressToken.prim = 'address';
    return AddressToken;
}(token_1.Token));
exports.AddressToken = AddressToken;
//# sourceMappingURL=address.js.map