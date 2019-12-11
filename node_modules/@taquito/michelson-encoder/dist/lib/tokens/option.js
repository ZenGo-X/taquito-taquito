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
var OptionToken = /** @class */ (function (_super) {
    __extends(OptionToken, _super);
    function OptionToken(val, idx, fac) {
        var _this = _super.call(this, val, idx, fac) || this;
        _this.val = val;
        _this.idx = idx;
        _this.fac = fac;
        return _this;
    }
    OptionToken.prototype.subToken = function () {
        return this.createToken(this.val.args[0], this.idx);
    };
    OptionToken.prototype.annot = function () {
        return Array.isArray(this.val.annots)
            ? _super.prototype.annot.call(this)
            : this.createToken(this.val.args[0], this.idx).annot();
    };
    OptionToken.prototype.Encode = function (args) {
        var value = args;
        if (value === undefined ||
            value === null ||
            (Array.isArray(value) && (value[0] === undefined || value[0] === null))) {
            return { prim: 'None' };
        }
        var schema = this.createToken(this.val.args[0], 0);
        return { prim: 'Some', args: [schema.Encode(args)] };
    };
    OptionToken.prototype.EncodeObject = function (args) {
        var schema = this.createToken(this.val.args[0], 0);
        var value = args;
        if (value === undefined || value === null) {
            return { prim: 'None' };
        }
        return { prim: 'Some', args: [schema.EncodeObject(value)] };
    };
    OptionToken.prototype.Execute = function (val, semantics) {
        if (val.prim === 'None') {
            return null;
        }
        var schema = this.createToken(this.val.args[0], 0);
        return schema.Execute(val.args[0], semantics);
    };
    OptionToken.prototype.ExtractSchema = function () {
        var schema = this.createToken(this.val.args[0], 0);
        return schema.ExtractSchema();
    };
    OptionToken.prototype.ExtractSignature = function () {
        var schema = this.createToken(this.val.args[0], 0);
        return __spreadArrays(schema.ExtractSignature(), [[]]);
    };
    OptionToken.prim = 'option';
    return OptionToken;
}(token_1.Token));
exports.OptionToken = OptionToken;
//# sourceMappingURL=option.js.map