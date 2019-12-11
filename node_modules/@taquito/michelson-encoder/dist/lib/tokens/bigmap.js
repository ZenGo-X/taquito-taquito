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
var BigMapToken = /** @class */ (function (_super) {
    __extends(BigMapToken, _super);
    function BigMapToken(val, idx, fac) {
        var _this = _super.call(this, val, idx, fac) || this;
        _this.val = val;
        _this.idx = idx;
        _this.fac = fac;
        return _this;
    }
    Object.defineProperty(BigMapToken.prototype, "ValueSchema", {
        get: function () {
            return this.createToken(this.val.args[1], 0);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BigMapToken.prototype, "KeySchema", {
        get: function () {
            return this.createToken(this.val.args[0], 0);
        },
        enumerable: true,
        configurable: true
    });
    BigMapToken.prototype.ExtractSchema = function () {
        var _a;
        return _a = {},
            _a[this.KeySchema.ExtractSchema()] = this.ValueSchema.ExtractSchema(),
            _a;
    };
    BigMapToken.prototype.Encode = function (args) {
        var _this = this;
        var val = args.pop();
        return Object.keys(val).map(function (key) {
            return {
                prim: 'Elt',
                args: [_this.KeySchema.Encode([key]), _this.ValueSchema.EncodeObject(val[key])],
            };
        });
    };
    BigMapToken.prototype.EncodeObject = function (args) {
        var _this = this;
        var val = args;
        return Object.keys(val).map(function (key) {
            return {
                prim: 'Elt',
                args: [_this.KeySchema.EncodeObject(key), _this.ValueSchema.EncodeObject(val[key])],
            };
        });
    };
    BigMapToken.prototype.Execute = function (val, semantic) {
        var _this = this;
        if (semantic && semantic[BigMapToken.prim]) {
            return semantic[BigMapToken.prim](val, this.val);
        }
        if (Array.isArray(val)) {
            // Athens is returning an empty array for big map in storage
            // Internal: In taquito v5 it is still used to decode big map diff (as if they were a regular map)
            return val.reduce(function (prev, current) {
                var _a;
                return __assign(__assign({}, prev), (_a = {}, _a[_this.KeySchema.ToKey(current.args[0])] = _this.ValueSchema.Execute(current.args[1]), _a));
            }, {});
        }
        else if ('int' in val) {
            // Babylon is returning an int with the big map id in contract storage
            return val.int;
        }
        else {
            // Unknown case
            throw new Error("Big map is expecting either an array (Athens) or an object with an int property (Babylon). Got " + JSON.stringify(val));
        }
    };
    BigMapToken.prim = 'big_map';
    return BigMapToken;
}(token_1.Token));
exports.BigMapToken = BigMapToken;
//# sourceMappingURL=bigmap.js.map