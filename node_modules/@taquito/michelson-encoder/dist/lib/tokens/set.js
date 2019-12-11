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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var token_1 = require("./token");
var SetToken = /** @class */ (function (_super) {
    __extends(SetToken, _super);
    function SetToken(val, idx, fac) {
        var _this = _super.call(this, val, idx, fac) || this;
        _this.val = val;
        _this.idx = idx;
        _this.fac = fac;
        return _this;
    }
    SetToken.prototype.Encode = function (args) {
        var val = args.pop();
        var schema = this.createToken(this.val.args[0], 0);
        return val.reduce(function (prev, current) {
            return __spreadArrays(prev, [schema.EncodeObject(current)]);
        }, []);
    };
    SetToken.prototype.Execute = function (val, semantics) {
        var schema = this.createToken(this.val.args[0], 0);
        return val.reduce(function (prev, current) {
            return __spreadArrays(prev, [schema.Execute(current, semantics)]);
        }, []);
    };
    SetToken.prototype.EncodeObject = function (args) {
        var schema = this.createToken(this.val.args[0], 0);
        return args.reduce(function (prev, current) {
            return __spreadArrays(prev, [schema.EncodeObject(current)]);
        }, []);
    };
    SetToken.prototype.ExtractSchema = function () {
        return SetToken.prim;
    };
    SetToken.prim = 'set';
    return SetToken;
}(token_1.Token));
exports.SetToken = SetToken;
//# sourceMappingURL=set.js.map