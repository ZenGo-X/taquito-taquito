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
Object.defineProperty(exports, "__esModule", { value: true });
var token_1 = require("./token");
var MapToken = /** @class */ (function (_super) {
    __extends(MapToken, _super);
    function MapToken(val, idx, fac) {
        var _this = _super.call(this, val, idx, fac) || this;
        _this.val = val;
        _this.idx = idx;
        _this.fac = fac;
        return _this;
    }
    Object.defineProperty(MapToken.prototype, "ValueSchema", {
        get: function () {
            return this.createToken(this.val.args[1], 0);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapToken.prototype, "KeySchema", {
        get: function () {
            return this.createToken(this.val.args[0], 0);
        },
        enumerable: true,
        configurable: true
    });
    MapToken.prototype.Execute = function (val, semantics) {
        var _this = this;
        return val.reduce(function (prev, current) {
            var _a;
            return __assign(__assign({}, prev), (_a = {}, _a[_this.KeySchema.ToKey(current.args[0])] = _this.ValueSchema.Execute(current.args[1], semantics), _a));
        }, {});
    };
    MapToken.prototype.Encode = function (args) {
        var _this = this;
        var val = args.pop();
        return Object.keys(val).map(function (key) {
            return {
                prim: 'Elt',
                args: [_this.KeySchema.Encode([key]), _this.ValueSchema.EncodeObject(val[key])],
            };
        });
    };
    MapToken.prototype.EncodeObject = function (args) {
        var _this = this;
        var val = args;
        return Object.keys(val).map(function (key) {
            return {
                prim: 'Elt',
                args: [_this.KeySchema.EncodeObject(key), _this.ValueSchema.EncodeObject(val[key])],
            };
        });
    };
    MapToken.prototype.ExtractSchema = function () {
        var _a;
        return _a = {},
            _a[this.KeySchema.ExtractSchema()] = this.ValueSchema.ExtractSchema(),
            _a;
    };
    MapToken.prim = 'map';
    return MapToken;
}(token_1.Token));
exports.MapToken = MapToken;
//# sourceMappingURL=map.js.map