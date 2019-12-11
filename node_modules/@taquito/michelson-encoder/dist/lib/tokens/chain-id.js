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
var ChainIDToken = /** @class */ (function (_super) {
    __extends(ChainIDToken, _super);
    function ChainIDToken(val, idx, fac) {
        var _this = _super.call(this, val, idx, fac) || this;
        _this.val = val;
        _this.idx = idx;
        _this.fac = fac;
        return _this;
    }
    ChainIDToken.prototype.Execute = function (val) {
        return val[Object.keys(val)[0]];
    };
    ChainIDToken.prototype.ExtractSchema = function () {
        return ChainIDToken.prim;
    };
    ChainIDToken.prototype.Encode = function (args) {
        var val = args.pop();
        return { string: val };
    };
    ChainIDToken.prototype.EncodeObject = function (val) {
        return { string: val };
    };
    // tslint:disable-next-line: variable-name
    ChainIDToken.prototype.ToKey = function (_a) {
        var string = _a.string;
        return string;
    };
    ChainIDToken.prototype.ToBigMapKey = function (val) {
        return {
            key: { string: val },
            type: { prim: ChainIDToken.prim },
        };
    };
    ChainIDToken.prim = 'chain_id';
    return ChainIDToken;
}(token_1.Token));
exports.ChainIDToken = ChainIDToken;
//# sourceMappingURL=chain-id.js.map