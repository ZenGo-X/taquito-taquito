(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('bignumber.js'), require('@taquito/utils')) :
    typeof define === 'function' && define.amd ? define(['exports', 'bignumber.js', '@taquito/utils'], factory) :
    (global = global || self, factory(global.taquitoMichelsonEncoder = {}, global.BigNumber, global.utils));
}(this, (function (exports, BigNumber, utils) { 'use strict';

    BigNumber = BigNumber && BigNumber.hasOwnProperty('default') ? BigNumber['default'] : BigNumber;

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }

    var Token = /** @class */ (function () {
        function Token(val, idx, fac) {
            this.val = val;
            this.idx = idx;
            this.fac = fac;
            this.createToken = this.fac;
        }
        Token.prototype.annot = function () {
            return (Array.isArray(this.val.annots) ? this.val.annots[0] : String(this.idx)).replace(/(%|\:)(_Liq_entry_)?/, '');
        };
        Token.prototype.hasAnnotations = function () {
            return Array.isArray(this.val.annots) && this.val.annots.length;
        };
        Token.prototype.ExtractSignature = function () {
            return [[this.ExtractSchema()]];
        };
        return Token;
    }());

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
    }(Token));

    var OrToken = /** @class */ (function (_super) {
        __extends(OrToken, _super);
        function OrToken(val, idx, fac) {
            var _this = _super.call(this, val, idx, fac) || this;
            _this.val = val;
            _this.idx = idx;
            _this.fac = fac;
            return _this;
        }
        OrToken.prototype.Encode = function (args) {
            var label = args[args.length - 1];
            var leftToken = this.createToken(this.val.args[0], this.idx);
            var keyCount = 1;
            if (leftToken instanceof OrToken) {
                keyCount = Object.keys(leftToken.ExtractSchema()).length;
            }
            var rightToken = this.createToken(this.val.args[1], this.idx + keyCount);
            if (String(leftToken.annot()) === String(label) && !(leftToken instanceof OrToken)) {
                args.pop();
                return { prim: 'Left', args: [leftToken.Encode(args)] };
            }
            else if (String(rightToken.annot()) === String(label) && !(rightToken instanceof OrToken)) {
                args.pop();
                return { prim: 'Right', args: [rightToken.Encode(args)] };
            }
            else {
                if (leftToken instanceof OrToken) {
                    var val = leftToken.Encode(args);
                    if (val) {
                        return { prim: 'Left', args: [val] };
                    }
                }
                if (rightToken instanceof OrToken) {
                    var val = rightToken.Encode(args);
                    if (val) {
                        return { prim: 'Right', args: [val] };
                    }
                }
                return null;
            }
        };
        OrToken.prototype.ExtractSignature = function () {
            var leftToken = this.createToken(this.val.args[0], this.idx);
            var keyCount = 1;
            if (leftToken instanceof OrToken) {
                keyCount = Object.keys(leftToken.ExtractSchema()).length;
            }
            var rightToken = this.createToken(this.val.args[1], this.idx + keyCount);
            var newSig = [];
            if (leftToken instanceof OrToken) {
                newSig.push.apply(newSig, leftToken.ExtractSignature());
            }
            else {
                for (var _i = 0, _a = leftToken.ExtractSignature(); _i < _a.length; _i++) {
                    var sig = _a[_i];
                    newSig.push(__spreadArrays([leftToken.annot()], sig));
                }
            }
            if (rightToken instanceof OrToken) {
                newSig.push.apply(newSig, rightToken.ExtractSignature());
            }
            else {
                for (var _b = 0, _c = rightToken.ExtractSignature(); _b < _c.length; _b++) {
                    var sig = _c[_b];
                    newSig.push(__spreadArrays([rightToken.annot()], sig));
                }
            }
            return newSig;
        };
        OrToken.prototype.EncodeObject = function (args) {
            var label = Object.keys(args)[0];
            var leftToken = this.createToken(this.val.args[0], this.idx);
            var keyCount = 1;
            if (leftToken instanceof OrToken) {
                keyCount = Object.keys(leftToken.ExtractSchema()).length;
            }
            var rightToken = this.createToken(this.val.args[1], this.idx + keyCount);
            if (String(leftToken.annot()) === String(label) && !(leftToken instanceof OrToken)) {
                return { prim: 'Left', args: [leftToken.EncodeObject(args[label])] };
            }
            else if (String(rightToken.annot()) === String(label) && !(rightToken instanceof OrToken)) {
                return { prim: 'Right', args: [rightToken.EncodeObject(args[label])] };
            }
            else {
                if (leftToken instanceof OrToken) {
                    var val = leftToken.EncodeObject(args);
                    if (val) {
                        return { prim: 'Left', args: [val] };
                    }
                }
                if (rightToken instanceof OrToken) {
                    var val = rightToken.EncodeObject(args);
                    if (val) {
                        return { prim: 'Right', args: [val] };
                    }
                }
                return null;
            }
        };
        OrToken.prototype.Execute = function (val, semantics) {
            var _a;
            var leftToken = this.createToken(this.val.args[0], this.idx);
            var keyCount = 1;
            if (leftToken instanceof OrToken) {
                keyCount = Object.keys(leftToken.ExtractSchema()).length;
            }
            var rightToken = this.createToken(this.val.args[1], this.idx + keyCount);
            if (val.prim === 'Right') {
                return rightToken.Execute(val.args[0], semantics);
            }
            else if (val.prim === 'Left') {
                return _a = {},
                    _a[leftToken.annot()] = leftToken.Execute(val.args[0], semantics),
                    _a;
            }
            else {
                throw new Error("Was expecting Left or Right prim but got: " + val.prim);
            }
        };
        OrToken.prototype.traversal = function (getLeftValue, getRightValue, concat) {
            var _a, _b;
            var leftToken = this.createToken(this.val.args[0], this.idx);
            var keyCount = 1;
            var leftValue;
            if (leftToken instanceof OrToken && !leftToken.hasAnnotations()) {
                leftValue = getLeftValue(leftToken);
                keyCount = Object.keys(leftToken.ExtractSchema()).length;
            }
            else {
                leftValue = (_a = {}, _a[leftToken.annot()] = getLeftValue(leftToken), _a);
            }
            var rightToken = this.createToken(this.val.args[1], this.idx + keyCount);
            var rightValue;
            if (rightToken instanceof OrToken && !rightToken.hasAnnotations()) {
                rightValue = getRightValue(rightToken);
            }
            else {
                rightValue = (_b = {}, _b[rightToken.annot()] = getRightValue(rightToken), _b);
            }
            var res = concat(leftValue, rightValue);
            return res;
        };
        OrToken.prototype.ExtractSchema = function () {
            return this.traversal(function (leftToken) { return leftToken.ExtractSchema(); }, function (rightToken) { return rightToken.ExtractSchema(); }, function (leftValue, rightValue) { return (__assign(__assign({}, leftValue), rightValue)); });
        };
        OrToken.prim = 'or';
        return OrToken;
    }(Token));

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
            if (leftToken instanceof OrToken) {
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
    }(Token));

    var NatToken = /** @class */ (function (_super) {
        __extends(NatToken, _super);
        function NatToken(val, idx, fac) {
            var _this = _super.call(this, val, idx, fac) || this;
            _this.val = val;
            _this.idx = idx;
            _this.fac = fac;
            return _this;
        }
        NatToken.prototype.Execute = function (val) {
            return new BigNumber(val[Object.keys(val)[0]]);
        };
        NatToken.prototype.Encode = function (args) {
            var val = args.pop();
            return { int: String(val).toString() };
        };
        NatToken.prototype.EncodeObject = function (val) {
            return { int: String(val).toString() };
        };
        NatToken.prototype.ExtractSchema = function () {
            return NatToken.prim;
        };
        NatToken.prototype.ToBigMapKey = function (val) {
            return {
                key: { int: val },
                type: { prim: NatToken.prim },
            };
        };
        NatToken.prototype.ToKey = function (_a) {
            var int = _a.int;
            return int;
        };
        NatToken.prim = 'nat';
        return NatToken;
    }(Token));

    var StringToken = /** @class */ (function (_super) {
        __extends(StringToken, _super);
        function StringToken(val, idx, fac) {
            var _this = _super.call(this, val, idx, fac) || this;
            _this.val = val;
            _this.idx = idx;
            _this.fac = fac;
            return _this;
        }
        StringToken.prototype.Execute = function (val) {
            return val[Object.keys(val)[0]];
        };
        StringToken.prototype.ExtractSchema = function () {
            return StringToken.prim;
        };
        StringToken.prototype.Encode = function (args) {
            var val = args.pop();
            return { string: val };
        };
        StringToken.prototype.EncodeObject = function (val) {
            return { string: val };
        };
        // tslint:disable-next-line: variable-name
        StringToken.prototype.ToKey = function (_a) {
            var string = _a.string;
            return string;
        };
        StringToken.prototype.ToBigMapKey = function (val) {
            return {
                key: { string: val },
                type: { prim: StringToken.prim },
            };
        };
        StringToken.prim = 'string';
        return StringToken;
    }(Token));

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
            var decoded = utils.b58decode(val);
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
            return utils.encodePubKey(val.bytes);
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
            return utils.encodePubKey(bytes);
        };
        AddressToken.prim = 'address';
        return AddressToken;
    }(Token));

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
    }(Token));

    var BoolToken = /** @class */ (function (_super) {
        __extends(BoolToken, _super);
        function BoolToken(val, idx, fac) {
            var _this = _super.call(this, val, idx, fac) || this;
            _this.val = val;
            _this.idx = idx;
            _this.fac = fac;
            return _this;
        }
        BoolToken.prototype.Execute = function (val) {
            return String(val.prim).toLowerCase() === 'true' ? true : false;
        };
        BoolToken.prototype.Encode = function (args) {
            var val = args.pop();
            return val ? 'true' : 'false';
        };
        BoolToken.prototype.EncodeObject = function (val) {
            return { prim: val ? 'True' : 'False' };
        };
        BoolToken.prototype.ExtractSchema = function () {
            return BoolToken.prim;
        };
        BoolToken.prim = 'bool';
        return BoolToken;
    }(Token));

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
            return utils.encodePubKey(val.bytes);
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
    }(Token));

    var ListToken = /** @class */ (function (_super) {
        __extends(ListToken, _super);
        function ListToken(val, idx, fac) {
            var _this = _super.call(this, val, idx, fac) || this;
            _this.val = val;
            _this.idx = idx;
            _this.fac = fac;
            return _this;
        }
        ListToken.prototype.Encode = function (args) {
            var val = args.pop();
            var schema = this.createToken(this.val.args[0], 0);
            return val.reduce(function (prev, current) {
                return __spreadArrays(prev, [schema.EncodeObject(current)]);
            }, []);
        };
        ListToken.prototype.Execute = function (val, semantics) {
            var schema = this.createToken(this.val.args[0], 0);
            return val.reduce(function (prev, current) {
                return __spreadArrays(prev, [schema.Execute(current, semantics)]);
            }, []);
        };
        ListToken.prototype.EncodeObject = function (args) {
            var schema = this.createToken(this.val.args[0], 0);
            return args.reduce(function (prev, current) {
                return __spreadArrays(prev, [schema.EncodeObject(current)]);
            }, []);
        };
        ListToken.prototype.ExtractSchema = function () {
            return ListToken.prim;
        };
        ListToken.prim = 'list';
        return ListToken;
    }(Token));

    var MutezToken = /** @class */ (function (_super) {
        __extends(MutezToken, _super);
        function MutezToken(val, idx, fac) {
            var _this = _super.call(this, val, idx, fac) || this;
            _this.val = val;
            _this.idx = idx;
            _this.fac = fac;
            return _this;
        }
        MutezToken.prototype.Execute = function (val) {
            return new BigNumber(val[Object.keys(val)[0]]);
        };
        MutezToken.prototype.ExtractSchema = function () {
            return MutezToken.prim;
        };
        MutezToken.prototype.Encode = function (args) {
            var val = args.pop();
            return { int: String(val).toString() };
        };
        MutezToken.prototype.EncodeObject = function (val) {
            return { int: String(val).toString() };
        };
        MutezToken.prototype.ToBigMapKey = function (val) {
            return {
                key: { int: val },
                type: { prim: MutezToken.prim },
            };
        };
        MutezToken.prototype.ToKey = function (_a) {
            var int = _a.int;
            return int;
        };
        MutezToken.prim = 'mutez';
        return MutezToken;
    }(Token));

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
    }(Token));

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
    }(Token));

    var TimestampToken = /** @class */ (function (_super) {
        __extends(TimestampToken, _super);
        function TimestampToken(val, idx, fac) {
            var _this = _super.call(this, val, idx, fac) || this;
            _this.val = val;
            _this.idx = idx;
            _this.fac = fac;
            return _this;
        }
        TimestampToken.prototype.Execute = function (val) {
            if (val.string) {
                return new Date(val.string).toISOString();
            }
            else if (val.int) {
                return new Date(Number(val.int) * 1000).toISOString();
            }
        };
        TimestampToken.prototype.Encode = function (args) {
            var val = args.pop();
            return { string: val };
        };
        TimestampToken.prototype.EncodeObject = function (val) {
            return { string: val };
        };
        TimestampToken.prototype.ExtractSchema = function () {
            return TimestampToken.prim;
        };
        // tslint:disable-next-line: variable-name
        TimestampToken.prototype.ToKey = function (_a) {
            var string = _a.string;
            return string;
        };
        TimestampToken.prototype.ToBigMapKey = function (val) {
            return {
                key: { string: val },
                type: { prim: TimestampToken.prim },
            };
        };
        TimestampToken.prim = 'timestamp';
        return TimestampToken;
    }(Token));

    var IntToken = /** @class */ (function (_super) {
        __extends(IntToken, _super);
        function IntToken(val, idx, fac) {
            var _this = _super.call(this, val, idx, fac) || this;
            _this.val = val;
            _this.idx = idx;
            _this.fac = fac;
            return _this;
        }
        IntToken.prototype.Execute = function (val) {
            return new BigNumber(val[Object.keys(val)[0]]);
        };
        IntToken.prototype.ExtractSchema = function () {
            return IntToken.prim;
        };
        IntToken.prototype.Encode = function (args) {
            var val = args.pop();
            return { int: String(val).toString() };
        };
        IntToken.prototype.EncodeObject = function (val) {
            return { int: String(val).toString() };
        };
        IntToken.prototype.ToBigMapKey = function (val) {
            return {
                key: { int: val },
                type: { prim: IntToken.prim },
            };
        };
        IntToken.prototype.ToKey = function (_a) {
            var int = _a.int;
            return int;
        };
        IntToken.prim = 'int';
        return IntToken;
    }(Token));

    var UnitToken = /** @class */ (function (_super) {
        __extends(UnitToken, _super);
        function UnitToken(val, idx, fac) {
            var _this = _super.call(this, val, idx, fac) || this;
            _this.val = val;
            _this.idx = idx;
            _this.fac = fac;
            return _this;
        }
        UnitToken.prototype.Encode = function (args) {
            args.pop();
            return { prim: 'Unit' };
        };
        UnitToken.prototype.EncodeObject = function (_val) {
            return { prim: 'Unit' };
        };
        UnitToken.prototype.Execute = function () {
            return null;
        };
        UnitToken.prototype.ExtractSchema = function () {
            return UnitToken.prim;
        };
        UnitToken.prim = 'unit';
        return UnitToken;
    }(Token));

    var KeyToken = /** @class */ (function (_super) {
        __extends(KeyToken, _super);
        function KeyToken(val, idx, fac) {
            var _this = _super.call(this, val, idx, fac) || this;
            _this.val = val;
            _this.idx = idx;
            _this.fac = fac;
            return _this;
        }
        KeyToken.prototype.Execute = function (val) {
            if (val.string) {
                return val.string;
            }
            return utils.encodeKey(val.bytes);
        };
        KeyToken.prototype.Encode = function (args) {
            var val = args.pop();
            return { string: val };
        };
        KeyToken.prototype.EncodeObject = function (val) {
            return { string: val };
        };
        KeyToken.prototype.ExtractSchema = function () {
            return KeyToken.prim;
        };
        KeyToken.prim = 'key';
        return KeyToken;
    }(Token));

    var KeyHashToken = /** @class */ (function (_super) {
        __extends(KeyHashToken, _super);
        function KeyHashToken(val, idx, fac) {
            var _this = _super.call(this, val, idx, fac) || this;
            _this.val = val;
            _this.idx = idx;
            _this.fac = fac;
            return _this;
        }
        KeyHashToken.prototype.Execute = function (val) {
            if (val.string) {
                return val.string;
            }
            return utils.encodeKeyHash(val.bytes);
        };
        KeyHashToken.prototype.Encode = function (args) {
            var val = args.pop();
            return { string: val };
        };
        KeyHashToken.prototype.EncodeObject = function (val) {
            return { string: val };
        };
        KeyHashToken.prototype.ExtractSchema = function () {
            return KeyHashToken.prim;
        };
        // tslint:disable-next-line: variable-name
        KeyHashToken.prototype.ToKey = function (_a) {
            var string = _a.string, bytes = _a.bytes;
            if (string) {
                return string;
            }
            return utils.encodeKeyHash(bytes);
        };
        KeyHashToken.prototype.ToBigMapKey = function (val) {
            return {
                key: { string: val },
                type: { prim: KeyHashToken.prim },
            };
        };
        KeyHashToken.prim = 'key_hash';
        return KeyHashToken;
    }(Token));

    var SignatureToken = /** @class */ (function (_super) {
        __extends(SignatureToken, _super);
        function SignatureToken(val, idx, fac) {
            var _this = _super.call(this, val, idx, fac) || this;
            _this.val = val;
            _this.idx = idx;
            _this.fac = fac;
            return _this;
        }
        SignatureToken.prototype.Execute = function (val) {
            return val.string;
        };
        SignatureToken.prototype.Encode = function (args) {
            var val = args.pop();
            return { string: val };
        };
        SignatureToken.prototype.EncodeObject = function (val) {
            return { string: val };
        };
        SignatureToken.prototype.ExtractSchema = function () {
            return SignatureToken.prim;
        };
        SignatureToken.prim = 'signature';
        return SignatureToken;
    }(Token));

    var LambdaToken = /** @class */ (function (_super) {
        __extends(LambdaToken, _super);
        function LambdaToken(val, idx, fac) {
            var _this = _super.call(this, val, idx, fac) || this;
            _this.val = val;
            _this.idx = idx;
            _this.fac = fac;
            return _this;
        }
        LambdaToken.prototype.Execute = function (val) {
            return val.string;
        };
        LambdaToken.prototype.Encode = function (args) {
            var val = args.pop();
            return val;
        };
        LambdaToken.prototype.EncodeObject = function (val) {
            return val;
        };
        LambdaToken.prototype.ExtractSchema = function () {
            var _a;
            var leftToken = this.createToken(this.val.args[0], this.idx);
            var rightToken = this.createToken(this.val.args[1], this.idx + 1);
            return _a = {},
                _a[LambdaToken.prim] = {
                    parameters: leftToken.ExtractSchema(),
                    returns: rightToken.ExtractSchema(),
                },
                _a;
        };
        LambdaToken.prim = 'lambda';
        return LambdaToken;
    }(Token));

    var OperationToken = /** @class */ (function (_super) {
        __extends(OperationToken, _super);
        function OperationToken(val, idx, fac) {
            var _this = _super.call(this, val, idx, fac) || this;
            _this.val = val;
            _this.idx = idx;
            _this.fac = fac;
            return _this;
        }
        OperationToken.prototype.Execute = function (val) {
            return val.string;
        };
        OperationToken.prototype.Encode = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var val = args.pop();
            return { string: val };
        };
        OperationToken.prototype.EncodeObject = function (val) {
            return { string: val };
        };
        OperationToken.prototype.ExtractSchema = function () {
            return OperationToken.prim;
        };
        OperationToken.prim = 'operation';
        return OperationToken;
    }(Token));

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
    }(Token));

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
    }(Token));

    var tokens = [
        PairToken,
        NatToken,
        StringToken,
        BigMapToken,
        AddressToken,
        MapToken,
        BoolToken,
        OrToken,
        ContractToken,
        ListToken,
        MutezToken,
        BytesToken,
        OptionToken,
        TimestampToken,
        IntToken,
        UnitToken,
        KeyToken,
        KeyHashToken,
        SignatureToken,
        LambdaToken,
        OperationToken,
        SetToken,
        ChainIDToken,
    ];

    var InvalidTokenError = /** @class */ (function () {
        function InvalidTokenError(message, data) {
            this.message = message;
            this.data = data;
            this.name = 'Invalid token error';
        }
        return InvalidTokenError;
    }());
    function createToken(val, idx) {
        var t = tokens.find(function (x) { return x.prim === val.prim; });
        if (!t) {
            throw new InvalidTokenError('Malformed data expected a value with a valid prim property', val);
        }
        return new t(val, idx, createToken);
    }

    /**
     * @warn Our current smart contract abstraction feature is currently in preview. It's API is not final, and it may not cover every use case (yet). We will greatly appreciate any feedback on this feature.
     */
    var Schema = /** @class */ (function () {
        function Schema(val) {
            this.root = createToken(val, 0);
            if (this.root instanceof BigMapToken) {
                this.bigMap = this.root;
            }
            else if (this.isExpressionExtended(val) && val.prim === 'pair') {
                var exp = val.args[0];
                if (this.isExpressionExtended(exp) && exp.prim === 'big_map') {
                    this.bigMap = new BigMapToken(exp, 0, createToken);
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
            if (this.root instanceof PairToken || this.root instanceof OrToken) {
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

    /**
     * @warn Our current smart contract abstraction feature is currently in preview. It's API is not final, and it may not cover every use case (yet). We will greatly appreciate any feedback on this feature.
     */
    var ParameterSchema = /** @class */ (function () {
        function ParameterSchema(val) {
            this.root = createToken(val, 0);
        }
        ParameterSchema.fromRPCResponse = function (val) {
            var parameter = val &&
                val.script &&
                Array.isArray(val.script.code) &&
                val.script.code.find(function (x) { return x.prim === 'parameter'; });
            if (!parameter || !Array.isArray(parameter.args)) {
                throw new Error('Invalid rpc response passed as arguments');
            }
            return new ParameterSchema(parameter.args[0]);
        };
        Object.defineProperty(ParameterSchema.prototype, "isMultipleEntryPoint", {
            get: function () {
                return (this.root instanceof OrToken ||
                    (this.root instanceof OptionToken && this.root.subToken() instanceof OrToken));
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ParameterSchema.prototype, "hasAnnotation", {
            get: function () {
                if (this.isMultipleEntryPoint) {
                    return Object.keys(this.ExtractSchema())[0] !== '0';
                }
                else {
                    return true;
                }
            },
            enumerable: true,
            configurable: true
        });
        ParameterSchema.prototype.Execute = function (val, semantics) {
            return this.root.Execute(val, semantics);
        };
        ParameterSchema.prototype.Encode = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return this.root.Encode(args.reverse());
        };
        ParameterSchema.prototype.ExtractSchema = function () {
            return this.root.ExtractSchema();
        };
        ParameterSchema.prototype.ExtractSignatures = function () {
            return this.root.ExtractSignature();
        };
        return ParameterSchema;
    }());

    exports.ParameterSchema = ParameterSchema;
    exports.Schema = Schema;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=taquito-michelson-encoder.umd.js.map
