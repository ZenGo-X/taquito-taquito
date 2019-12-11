"use strict";
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
var bigmap_1 = require("../tokens/bigmap");
var createToken_1 = require("../tokens/createToken");
var or_1 = require("../tokens/or");
var pair_1 = require("../tokens/pair");
/**
 * @warn Our current smart contract abstraction feature is currently in preview. It's API is not final, and it may not cover every use case (yet). We will greatly appreciate any feedback on this feature.
 */
var Schema = /** @class */ (function () {
    function Schema(val) {
        this.root = createToken_1.createToken(val, 0);
        if (this.root instanceof bigmap_1.BigMapToken) {
            this.bigMap = this.root;
        }
        else if (this.isExpressionExtended(val) && val.prim === 'pair') {
            var exp = val.args[0];
            if (this.isExpressionExtended(exp) && exp.prim === 'big_map') {
                this.bigMap = new bigmap_1.BigMapToken(exp, 0, createToken_1.createToken);
            }
        }
    }
    Schema.fromRPCResponse = function (val) {
        var storage = val &&
            val.script &&
            Array.isArray(val.script.code) &&
            val.script.code.find(function (x) { return x.prim === 'storage'; });
        if (!storage || !Array.isArray(storage.args)) {
            throw new Error('Invalid rpc response passed as arguments');
        }
        return new Schema(storage.args[0]);
    };
    Schema.prototype.isExpressionExtended = function (val) {
        return 'prim' in val && Array.isArray(val.args);
    };
    Schema.prototype.removeTopLevelAnnotation = function (obj) {
        // PairToken and OrToken can have redundant top level annotation in their storage
        if (this.root instanceof pair_1.PairToken || this.root instanceof or_1.OrToken) {
            if (this.root.hasAnnotations() && typeof obj === 'object' && Object.keys(obj).length === 1) {
                return obj[Object.keys(obj)[0]];
            }
        }
        return obj;
    };
    Schema.prototype.Execute = function (val, semantics) {
        var storage = this.root.Execute(val, semantics);
        return this.removeTopLevelAnnotation(storage);
    };
    Schema.prototype.ExecuteOnBigMapDiff = function (diff, semantics) {
        if (!this.bigMap) {
            throw new Error('No big map schema');
        }
        if (!Array.isArray(diff)) {
            throw new Error('Invalid big map diff. It must be an array');
        }
        var eltFormat = diff.map(function (_a) {
            var key = _a.key, value = _a.value;
            return ({ args: [key, value] });
        });
        return this.bigMap.Execute(eltFormat, semantics);
    };
    Schema.prototype.ExecuteOnBigMapValue = function (key, semantics) {
        if (!this.bigMap) {
            throw new Error('No big map schema');
        }
        return this.bigMap.ValueSchema.Execute(key, semantics);
    };
    Schema.prototype.EncodeBigMapKey = function (key) {
        if (!this.bigMap) {
            throw new Error('No big map schema');
        }
        try {
            return this.bigMap.KeySchema.ToBigMapKey(key);
        }
        catch (ex) {
            throw new Error('Unable to encode big map key: ' + ex);
        }
    };
    Schema.prototype.Encode = function (_value) {
        try {
            return this.root.EncodeObject(_value);
        }
        catch (ex) {
            throw new Error("Unable to encode storage object. " + ex);
        }
    };
    Schema.prototype.ExtractSchema = function () {
        return this.removeTopLevelAnnotation(this.root.ExtractSchema());
    };
    /**
     * @deprecated
     */
    Schema.prototype.ComputeState = function (tx, state) {
        var _a;
        var _this = this;
        if (!this.bigMap) {
            throw new Error('No big map schema');
        }
        var bigMap = tx.reduce(function (prev, current) {
            return __assign(__assign({}, prev), _this.ExecuteOnBigMapDiff(current.contents[0].metadata.operation_result.big_map_diff));
        }, {});
        return __assign(__assign({}, this.Execute(state)), (_a = {}, _a[this.bigMap.annot()] = bigMap, _a));
    };
    return Schema;
}());
exports.Schema = Schema;
//# sourceMappingURL=storage.js.map