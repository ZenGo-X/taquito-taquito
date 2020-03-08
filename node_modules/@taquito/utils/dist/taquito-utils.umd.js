(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('buffer')) :
  typeof define === 'function' && define.amd ? define(['exports', 'buffer'], factory) :
  (global = global || self, factory(global.taquitoUtils = {}, global.buffer));
}(this, (function (exports, buffer) { 'use strict';

  var _a, _b;
  (function (Prefix) {
      Prefix["TZ1"] = "tz1";
      Prefix["TZ2"] = "tz2";
      Prefix["TZ3"] = "tz3";
      Prefix["KT"] = "KT";
      Prefix["KT1"] = "KT1";
      Prefix["EDSK2"] = "edsk2";
      Prefix["SPSK"] = "spsk";
      Prefix["P2SK"] = "p2sk";
      Prefix["EDPK"] = "edpk";
      Prefix["SPPK"] = "sppk";
      Prefix["P2PK"] = "p2pk";
      Prefix["EDESK"] = "edesk";
      Prefix["SPESK"] = "spesk";
      Prefix["P2ESK"] = "p2esk";
      Prefix["EDSK"] = "edsk";
      Prefix["EDSIG"] = "edsig";
      Prefix["SPSIG"] = "spsig";
      Prefix["P2SIG"] = "p2sig";
      Prefix["SIG"] = "sig";
      Prefix["NET"] = "Net";
      Prefix["NCE"] = "nce";
      Prefix["B"] = "b";
      Prefix["O"] = "o";
      Prefix["LO"] = "Lo";
      Prefix["LLO"] = "LLo";
      Prefix["P"] = "P";
      Prefix["CO"] = "Co";
      Prefix["ID"] = "id";
      Prefix["EXPR"] = "expr";
      Prefix["TZ"] = "TZ";
  })(exports.Prefix || (exports.Prefix = {}));
  var prefix = (_a = {},
      _a[exports.Prefix.TZ1] = new Uint8Array([6, 161, 159]),
      _a[exports.Prefix.TZ2] = new Uint8Array([6, 161, 161]),
      _a[exports.Prefix.TZ3] = new Uint8Array([6, 161, 164]),
      _a[exports.Prefix.KT] = new Uint8Array([2, 90, 121]),
      _a[exports.Prefix.KT1] = new Uint8Array([2, 90, 121]),
      _a[exports.Prefix.EDSK] = new Uint8Array([43, 246, 78, 7]),
      _a[exports.Prefix.EDSK2] = new Uint8Array([13, 15, 58, 7]),
      _a[exports.Prefix.SPSK] = new Uint8Array([17, 162, 224, 201]),
      _a[exports.Prefix.P2SK] = new Uint8Array([16, 81, 238, 189]),
      _a[exports.Prefix.EDPK] = new Uint8Array([13, 15, 37, 217]),
      _a[exports.Prefix.SPPK] = new Uint8Array([3, 254, 226, 86]),
      _a[exports.Prefix.P2PK] = new Uint8Array([3, 178, 139, 127]),
      _a[exports.Prefix.EDESK] = new Uint8Array([7, 90, 60, 179, 41]),
      _a[exports.Prefix.SPESK] = new Uint8Array([0x09, 0xed, 0xf1, 0xae, 0x96]),
      _a[exports.Prefix.P2ESK] = new Uint8Array([0x09, 0x30, 0x39, 0x73, 0xab]),
      _a[exports.Prefix.EDSIG] = new Uint8Array([9, 245, 205, 134, 18]),
      _a[exports.Prefix.SPSIG] = new Uint8Array([13, 115, 101, 19, 63]),
      _a[exports.Prefix.P2SIG] = new Uint8Array([54, 240, 44, 52]),
      _a[exports.Prefix.SIG] = new Uint8Array([4, 130, 43]),
      _a[exports.Prefix.NET] = new Uint8Array([87, 82, 0]),
      _a[exports.Prefix.NCE] = new Uint8Array([69, 220, 169]),
      _a[exports.Prefix.B] = new Uint8Array([1, 52]),
      _a[exports.Prefix.O] = new Uint8Array([5, 116]),
      _a[exports.Prefix.LO] = new Uint8Array([133, 233]),
      _a[exports.Prefix.LLO] = new Uint8Array([29, 159, 109]),
      _a[exports.Prefix.P] = new Uint8Array([2, 170]),
      _a[exports.Prefix.CO] = new Uint8Array([79, 179]),
      _a[exports.Prefix.ID] = new Uint8Array([153, 103]),
      _a[exports.Prefix.EXPR] = new Uint8Array([13, 44, 64, 27]),
      // Legacy prefix
      _a[exports.Prefix.TZ] = new Uint8Array([2, 90, 121]),
      _a);
  var prefixLength = (_b = {},
      _b[exports.Prefix.TZ1] = 20,
      _b[exports.Prefix.TZ2] = 20,
      _b[exports.Prefix.TZ3] = 20,
      _b[exports.Prefix.KT] = 20,
      _b[exports.Prefix.KT1] = 20,
      _b[exports.Prefix.EDPK] = 32,
      _b[exports.Prefix.SPPK] = 33,
      _b[exports.Prefix.P2PK] = 33,
      _b[exports.Prefix.EDSIG] = 64,
      _b[exports.Prefix.SPSIG] = 64,
      _b[exports.Prefix.P2SIG] = 64,
      _b[exports.Prefix.SIG] = 64,
      _b[exports.Prefix.NET] = 4,
      _b[exports.Prefix.B] = 32,
      _b[exports.Prefix.P] = 32,
      _b);

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

  function __read(o, n) {
      var m = typeof Symbol === "function" && o[Symbol.iterator];
      if (!m) return o;
      var i = m.call(o), r, ar = [], e;
      try {
          while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
      }
      catch (error) { e = { error: error }; }
      finally {
          try {
              if (r && !r.done && (m = i["return"])) m.call(i);
          }
          finally { if (e) throw e.error; }
      }
      return ar;
  }

  function __spread() {
      for (var ar = [], i = 0; i < arguments.length; i++)
          ar = ar.concat(__read(arguments[i]));
      return ar;
  }

  var bs58check = require('bs58check');
  (function (ValidationResult) {
      ValidationResult[ValidationResult["NO_PREFIX_MATCHED"] = 0] = "NO_PREFIX_MATCHED";
      ValidationResult[ValidationResult["INVALID_CHECKSUM"] = 1] = "INVALID_CHECKSUM";
      ValidationResult[ValidationResult["INVALID_LENGTH"] = 2] = "INVALID_LENGTH";
      ValidationResult[ValidationResult["VALID"] = 3] = "VALID";
  })(exports.ValidationResult || (exports.ValidationResult = {}));
  function isValidPrefix(value) {
      if (typeof value !== 'string') {
          return false;
      }
      return value in prefix;
  }
  function validatePrefixedValue(value, prefixes) {
      var match = new RegExp("^(" + prefixes.join('|') + ")").exec(value);
      if (!match || match.length === 0) {
          return exports.ValidationResult.NO_PREFIX_MATCHED;
      }
      var prefixKey = match[0];
      if (!isValidPrefix(prefixKey)) {
          return exports.ValidationResult.NO_PREFIX_MATCHED;
      }
      // decodeUnsafe return undefined if decoding fail
      var decoded = bs58check.decodeUnsafe(value);
      if (!decoded) {
          return exports.ValidationResult.INVALID_CHECKSUM;
      }
      decoded = decoded.slice(prefix[prefixKey].length);
      if (decoded.length !== prefixLength[prefixKey]) {
          return exports.ValidationResult.INVALID_LENGTH;
      }
      return exports.ValidationResult.VALID;
  }
  var implicitPrefix = [exports.Prefix.TZ1, exports.Prefix.TZ2, exports.Prefix.TZ3];
  var contractPrefix = [exports.Prefix.KT1];
  var signaturePrefix = [exports.Prefix.EDSIG, exports.Prefix.P2SIG, exports.Prefix.SPSIG, exports.Prefix.SIG];
  var pkPrefix = [exports.Prefix.EDPK, exports.Prefix.SPPK, exports.Prefix.P2PK];
  function validateAddress(value) {
      return validatePrefixedValue(value, __spread(implicitPrefix, contractPrefix));
  }
  function validateChain(value) {
      return validatePrefixedValue(value, [exports.Prefix.NET]);
  }
  function validateContractAddress(value) {
      return validatePrefixedValue(value, contractPrefix);
  }
  function validateKeyHash(value) {
      return validatePrefixedValue(value, implicitPrefix);
  }
  function validateSignature(value) {
      return validatePrefixedValue(value, signaturePrefix);
  }
  function validatePublicKey(value) {
      return validatePrefixedValue(value, pkPrefix);
  }

  /*
   * Some code in this file is originally from sotez and eztz
   * Copyright (c) 2018 Andrew Kishino
   * Copyright (c) 2017 Stephen Andrews
   */
  var blake = require('blakejs');
  var bs58check$1 = require('bs58check');
  function encodeExpr(value) {
      var blakeHash = blake.blake2b(hex2buf(value), null, 32);
      return b58cencode(blakeHash, prefix['expr']);
  }
  /**
   *
   * @description Base58 encode a string or a Uint8Array and append a prefix to it
   *
   * @param value Value to base58 encode
   * @param prefix prefix to append to the encoded string
   */
  function b58cencode(value, prefix) {
      var payloadAr = typeof value === 'string' ? Uint8Array.from(buffer.Buffer.from(value, 'hex')) : value;
      var n = new Uint8Array(prefix.length + payloadAr.length);
      n.set(prefix);
      n.set(payloadAr, prefix.length);
      return bs58check$1.encode(buffer.Buffer.from(n.buffer));
  }
  /**
   *
   * @description Base58 decode a string and remove the prefix from it
   *
   * @param value Value to base58 decode
   * @param prefix prefix to remove from the decoded string
   */
  var b58cdecode = function (enc, prefixArg) {
      return bs58check$1.decode(enc).slice(prefixArg.length);
  };
  /**
   *
   * @description Base58 decode a string with predefined prefix
   *
   * @param value Value to base58 decode
   */
  function b58decode(payload) {
      var _a;
      var buf = bs58check$1.decode(payload);
      var prefixMap = (_a = {},
          _a[prefix.tz1.toString()] = '0000',
          _a[prefix.tz2.toString()] = '0001',
          _a[prefix.tz3.toString()] = '0002',
          _a);
      var pref = prefixMap[new Uint8Array(buf.slice(0, 3)).toString()];
      if (pref) {
          // tz addresses
          var hex = buf2hex(buf.slice(3));
          return pref + hex;
      }
      else {
          // other (kt addresses)
          return '01' + buf2hex(buf.slice(3, 42)) + '00';
      }
  }
  /**
   *
   * @description Base58 encode a public key using predefined prefix
   *
   * @param value Public Key to base58 encode
   */
  function encodePubKey(value) {
      if (value.substring(0, 2) === '00') {
          var pref = {
              '0000': prefix.tz1,
              '0001': prefix.tz2,
              '0002': prefix.tz3,
          };
          return b58cencode(value.substring(4), pref[value.substring(0, 4)]);
      }
      return b58cencode(value.substring(2, 42), prefix.KT);
  }
  function encodeKey(value) {
      if (value[0] === '0') {
          var pref = {
              '00': new Uint8Array([13, 15, 37, 217]),
              '01': new Uint8Array([3, 254, 226, 86]),
              '02': new Uint8Array([3, 178, 139, 127]),
          };
          return b58cencode(value.substring(2), pref[value.substring(0, 2)]);
      }
  }
  function encodeKeyHash(value) {
      if (value[0] === '0') {
          var pref = {
              '00': new Uint8Array([6, 161, 159]),
              '01': new Uint8Array([6, 161, 161]),
              '02': new Uint8Array([6, 161, 164]),
          };
          return b58cencode(value.substring(2), pref[value.substring(0, 2)]);
      }
  }
  /**
   *
   * @description Convert an hex string to a Uint8Array
   *
   * @param hex Hex string to convert
   */
  var hex2buf = function (hex) {
      return new Uint8Array(hex.match(/[\da-f]{2}/gi).map(function (h) { return parseInt(h, 16); }));
  };
  /**
   *
   * @description Generate a random hex nonce
   *
   * @param length length of the nonce
   */
  var hexNonce = function (length) {
      var chars = '0123456789abcedf';
      var hex = '';
      while (length--) {
          hex += chars[(Math.random() * 16) | 0];
      }
      return hex;
  };
  /**
   *
   * @description Merge 2 buffers together
   *
   * @param b1 First buffer
   * @param b2 Second buffer
   */
  var mergebuf = function (b1, b2) {
      var r = new Uint8Array(b1.length + b2.length);
      r.set(b1);
      r.set(b2, b1.length);
      return r;
  };
  /**
   *
   * @description Convert a michelson string expression to it's json representation
   *
   * @param mi Michelson string expression to convert to json
   */
  var sexp2mic = function me(mi) {
      mi = mi
          .replace(/(?:@[a-z_]+)|(?:#.*$)/gm, '')
          .replace(/\s+/g, ' ')
          .trim();
      if (mi.charAt(0) === '(')
          mi = mi.slice(1, -1);
      var pl = 0;
      var sopen = false;
      var escaped = false;
      var ret = {
          prim: '',
          args: [],
      };
      var val = '';
      for (var i = 0; i < mi.length; i++) {
          if (escaped) {
              val += mi[i];
              escaped = false;
              continue;
          }
          else if ((i === mi.length - 1 && sopen === false) ||
              (mi[i] === ' ' && pl === 0 && sopen === false)) {
              if (i === mi.length - 1)
                  val += mi[i];
              if (val) {
                  if (val === parseInt(val, 10).toString()) {
                      if (!ret.prim)
                          return { int: val };
                      ret.args.push({ int: val });
                  }
                  else if (val[0] === '0' && val[1] === 'x') {
                      val = val.substr(2);
                      if (!ret.prim)
                          return { bytes: val };
                      ret.args.push({ bytes: val });
                  }
                  else if (ret.prim) {
                      ret.args.push(me(val));
                  }
                  else {
                      ret.prim = val;
                  }
                  val = '';
              }
              continue;
          }
          else if (mi[i] === '"' && sopen) {
              sopen = false;
              if (!ret.prim)
                  return { string: val };
              ret.args.push({ string: val });
              val = '';
              continue;
          }
          else if (mi[i] === '"' && !sopen && pl === 0) {
              sopen = true;
              continue;
          }
          else if (mi[i] === '\\')
              escaped = true;
          else if (mi[i] === '(')
              pl++;
          else if (mi[i] === ')')
              pl--;
          val += mi[i];
      }
      return ret;
  };
  /**
   *
   * @description Flatten a michelson json representation to an array
   *
   * @param s michelson json
   */
  var mic2arr = function me2(s) {
      var ret = [];
      if (Object.prototype.hasOwnProperty.call(s, 'prim')) {
          if (s.prim === 'Pair') {
              ret.push(me2(s.args[0]));
              ret = ret.concat(me2(s.args[1]));
          }
          else if (s.prim === 'Elt') {
              ret = {
                  key: me2(s.args[0]),
                  val: me2(s.args[1]),
              };
          }
          else if (s.prim === 'True') {
              ret = true;
          }
          else if (s.prim === 'False') {
              ret = false;
          }
      }
      else if (Array.isArray(s)) {
          var sc = s.length;
          for (var i = 0; i < sc; i++) {
              var n = me2(s[i]);
              if (typeof n.key !== 'undefined') {
                  if (Array.isArray(ret)) {
                      ret = {
                          keys: [],
                          vals: [],
                      };
                  }
                  ret.keys.push(n.key);
                  ret.vals.push(n.val);
              }
              else {
                  ret.push(n);
              }
          }
      }
      else if (Object.prototype.hasOwnProperty.call(s, 'string')) {
          ret = s.string;
      }
      else if (Object.prototype.hasOwnProperty.call(s, 'int')) {
          ret = parseInt(s.int, 10);
      }
      else {
          ret = s;
      }
      return ret;
  };
  /**
   *
   * @description Convert a michelson string to it's json representation
   *
   * @param mi Michelson string to convert to json
   *
   * @warn This implementation of the Michelson parser is a prototype. The current implementation is naïve. We are likely going to switch to using the Nomadic Michelson encoder in the future, as per Issue https://gitlab.com/tezos/tezos/issues/581
   */
  var ml2mic = function me(mi) {
      var ret = [];
      var inseq = false;
      var seq = '';
      var val = '';
      var pl = 0;
      var bl = 0;
      var sopen = false;
      var escaped = false;
      for (var i = 0; i < mi.length; i++) {
          if (val === '}' || val === ';') {
              val = '';
          }
          if (inseq) {
              if (mi[i] === '}') {
                  bl--;
              }
              else if (mi[i] === '{') {
                  bl++;
              }
              if (bl === 0) {
                  var st = me(val);
                  ret.push({
                      prim: seq.trim(),
                      args: [st],
                  });
                  val = '';
                  bl = 0;
                  inseq = false;
              }
          }
          else if (mi[i] === '{') {
              bl++;
              seq = val;
              val = '';
              inseq = true;
              continue;
          }
          else if (escaped) {
              val += mi[i];
              escaped = false;
              continue;
          }
          else if ((i === mi.length - 1 && sopen === false) ||
              (mi[i] === ';' && pl === 0 && sopen === false)) {
              if (i === mi.length - 1)
                  val += mi[i];
              if (val.trim() === '' || val.trim() === '}' || val.trim() === ';') {
                  val = '';
                  continue;
              }
              ret.push(sexp2mic(val));
              val = '';
              continue;
          }
          else if (mi[i] === '"' && sopen) {
              sopen = false;
          }
          else if (mi[i] === '"' && !sopen) {
              sopen = true;
          }
          else if (mi[i] === '\\') {
              escaped = true;
          }
          else if (mi[i] === '(') {
              pl++;
          }
          else if (mi[i] === ')') {
              pl--;
          }
          val += mi[i];
      }
      return ret;
  };
  /**
   *
   * @description Convert a buffer to an hex string
   *
   * @param buffer Buffer to convert
   */
  var buf2hex = function (buffer) {
      var byteArray = new Uint8Array(buffer);
      var hexParts = [];
      byteArray.forEach(function (byte) {
          var hex = byte.toString(16);
          var paddedHex = ("00" + hex).slice(-2);
          hexParts.push(paddedHex);
      });
      return hexParts.join('');
  };

  exports.b58cdecode = b58cdecode;
  exports.b58cencode = b58cencode;
  exports.b58decode = b58decode;
  exports.buf2hex = buf2hex;
  exports.encodeExpr = encodeExpr;
  exports.encodeKey = encodeKey;
  exports.encodeKeyHash = encodeKeyHash;
  exports.encodePubKey = encodePubKey;
  exports.hex2buf = hex2buf;
  exports.hexNonce = hexNonce;
  exports.isValidPrefix = isValidPrefix;
  exports.mergebuf = mergebuf;
  exports.mic2arr = mic2arr;
  exports.ml2mic = ml2mic;
  exports.prefix = prefix;
  exports.prefixLength = prefixLength;
  exports.sexp2mic = sexp2mic;
  exports.validateAddress = validateAddress;
  exports.validateChain = validateChain;
  exports.validateContractAddress = validateContractAddress;
  exports.validateKeyHash = validateKeyHash;
  exports.validatePublicKey = validatePublicKey;
  exports.validateSignature = validateSignature;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=taquito-utils.umd.js.map
