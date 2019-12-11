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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var token_1 = require("./token");
var or_1 = require("./or");
var PairToken = /** @class */ (function (_super) {
    __extends(PairToken, _super);
    function PairToken(val, idx, fac) {
        var _this = _super.call(this, val, idx, fac) || this;
        _this.val = val;
        _this.idx = idx;
        _this.fac = fac;
        return _this;
    }
    PairToken.prototype.Encode = function (args) {
        var leftToken = this.createToken(this.val.args[0], this.idx);
        var keyCount = 1;
        if (leftToken instanceof PairToken) {
            keyCount = Object.keys(leftToken.ExtractSchema()).length;
        }
        var rightToken = this.createToken(this.val.args[1], this.idx + keyCount);
        return {
            prim: 'Pair',
            args: [leftToken.Encode(args), rightToken.Encode(args)],
        };
    };
    PairToken.prototype.ExtractSignature = function () {
        var leftToken = this.createToken(this.val.args[0], this.idx);
        var keyCount = 1;
        if (leftToken instanceof or_1.OrToken) {
            keyCount = Object.keys(leftToken.ExtractSchema()).length;
        }
        var rightToken = this.createToken(this.val.args[1], this.idx + keyCount);
        var newSig = [];
        for (var _i = 0, _a = leftToken.ExtractSignature(); _i < _a.length; _i++) {
            var leftSig = _a[_i];
            for (var _b = 0, _c = rightToken.ExtractSignature(); _b < _c.length; _b++) {
                var rightSig = _c[_b];
                newSig.push(__spreadArrays(leftSig, rightSig));
            }
        }
        return newSig;
    };
    PairToken.prototype.EncodeObject = function (args) {
        var leftToken = this.createToken(this.val.args[0], this.idx);
        var keyCount = 1;
        if (leftToken instanceof PairToken) {
            keyCount = Object.keys(leftToken.ExtractSchema()).length;
        }
        var rightToken = this.createToken(this.val.args[1], this.idx + keyCount);
        var leftValue;
        if (leftToken instanceof PairToken && !leftToken.hasAnnotations()) {
            leftValue = args;
        }
        else {
            leftValue = args[leftToken.annot()];
        }
        var rightValue;
        if (rightToken instanceof PairToken && !rightToken.hasAnnotations()) {
            rightValue = args;
        }
        else {
            rightValue = args[rightToken.annot()];
        }
        return {
            prim: 'Pair',
            args: [leftToken.EncodeObject(leftValue), rightToken.EncodeObject(rightValue)],
        };
    };
    PairToken.prototype.traversal = function (getLeftValue, getRightValue) {
        var _a, _b;
        var leftToken = this.createToken(this.val.args[0], this.idx);
        var keyCount = 1;
        var leftValue;
        if (leftToken instanceof PairToken && !leftToken.hasAnnotations()) {
            leftValue = getLeftValue(leftToken);
            keyCount = Object.keys(leftToken.ExtractSchema()).length;
        }
        else {
            leftValue = (_a = {}, _a[leftToken.annot()] = getLeftValue(leftToken), _a);
        }
        var rightToken = this.createToken(this.val.args[1], this.idx + keyCount);
        var rightValue;
        if (rightToken instanceof PairToken && !rightToken.hasAnnotations()) {
            rightValue = getRightValue(rightToken);
        }
        else {
            rightValue = (_b = {}, _b[rightToken.annot()] = getRightValue(rightToken), _b);
        }
        var res = __assign(__assign({}, leftValue), rightValue);
        return res;
    };
    PairToken.prototype.Execute = function (val, semantics) {
        return this.traversal(function (leftToken) { return leftToken.Execute(val.args[0], semantics); }, function (rightToken) { return rightToken.Execute(val.args[1], semantics); });
    };
    PairToken.prototype.ExtractSchema = function () {
        return this.traversal(function (leftToken) { return leftToken.ExtractSchema(); }, function (rightToken) { return rightToken.ExtractSchema(); });
    };
    PairToken.prim = 'pair';
    return PairToken;
}(token_1.Token));
exports.PairToken = PairToken;
//# sourceMappingURL=pair.js.map