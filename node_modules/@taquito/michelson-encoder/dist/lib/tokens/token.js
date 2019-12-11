"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.Token = Token;
//# sourceMappingURL=token.js.map