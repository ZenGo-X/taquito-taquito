"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChainIds = exports.DefaultLambdaAddresses = exports.protocols = exports.Protocols = exports.DEFAULT_STORAGE_LIMIT = exports.DEFAULT_FEE = exports.DEFAULT_GAS_LIMIT = void 0;
var DEFAULT_GAS_LIMIT;
(function (DEFAULT_GAS_LIMIT) {
    DEFAULT_GAS_LIMIT[DEFAULT_GAS_LIMIT["DELEGATION"] = 10600] = "DELEGATION";
    DEFAULT_GAS_LIMIT[DEFAULT_GAS_LIMIT["ORIGINATION"] = 10600] = "ORIGINATION";
    DEFAULT_GAS_LIMIT[DEFAULT_GAS_LIMIT["TRANSFER"] = 10600] = "TRANSFER";
    DEFAULT_GAS_LIMIT[DEFAULT_GAS_LIMIT["REVEAL"] = 1100] = "REVEAL";
})(DEFAULT_GAS_LIMIT = exports.DEFAULT_GAS_LIMIT || (exports.DEFAULT_GAS_LIMIT = {}));
var DEFAULT_FEE;
(function (DEFAULT_FEE) {
    DEFAULT_FEE[DEFAULT_FEE["DELEGATION"] = 1257] = "DELEGATION";
    DEFAULT_FEE[DEFAULT_FEE["ORIGINATION"] = 10000] = "ORIGINATION";
    DEFAULT_FEE[DEFAULT_FEE["TRANSFER"] = 10000] = "TRANSFER";
    DEFAULT_FEE[DEFAULT_FEE["REVEAL"] = 374] = "REVEAL";
})(DEFAULT_FEE = exports.DEFAULT_FEE || (exports.DEFAULT_FEE = {}));
var DEFAULT_STORAGE_LIMIT;
(function (DEFAULT_STORAGE_LIMIT) {
    DEFAULT_STORAGE_LIMIT[DEFAULT_STORAGE_LIMIT["DELEGATION"] = 0] = "DELEGATION";
    DEFAULT_STORAGE_LIMIT[DEFAULT_STORAGE_LIMIT["ORIGINATION"] = 257] = "ORIGINATION";
    DEFAULT_STORAGE_LIMIT[DEFAULT_STORAGE_LIMIT["TRANSFER"] = 257] = "TRANSFER";
    DEFAULT_STORAGE_LIMIT[DEFAULT_STORAGE_LIMIT["REVEAL"] = 0] = "REVEAL";
})(DEFAULT_STORAGE_LIMIT = exports.DEFAULT_STORAGE_LIMIT || (exports.DEFAULT_STORAGE_LIMIT = {}));
var Protocols;
(function (Protocols) {
    Protocols["Pt24m4xi"] = "Pt24m4xiPbLDhVgVfABUjirbmda3yohdN82Sp9FeuAXJ4eV9otd";
    Protocols["PsBABY5H"] = "PsBABY5HQTSkA4297zNHfsZNKtxULfL18y95qb3m53QJiXGmrbU";
    Protocols["PsBabyM1"] = "PsBabyM1eUXZseaJdmXFApDSBqj8YBfwELoxZHHW77EMcAbbwAS";
    Protocols["PsCARTHA"] = "PsCARTHAGazKbHtnKfLzQg3kms52kSRpgnDY982a9oYsSXRLQEb";
    Protocols["PsDELPH1"] = "PsDELPH1Kxsxt8f9eWbxQeRxkjfbxoqM52jvs5Y5fBxWWh4ifpo";
    Protocols["PtEdo2Zk"] = "PtEdo2ZkT9oKpimTah6x2embF25oss54njMuPzkJTEi5RqfdZFA";
    Protocols["PsFLorena"] = "PsFLorenaUUuikDWvMDr6fGBRG8kt3e3D3fHoXK1j1BFRxeSH4i";
    Protocols["PtGRANADs"] = "PtGRANADsDU8R9daYKAgWnQYAJ64omN1o3KMGVCykShA97vQbvV";
})(Protocols = exports.Protocols || (exports.Protocols = {}));
exports.protocols = {
    '004': [Protocols.Pt24m4xi],
    '005': [Protocols.PsBABY5H, Protocols.PsBabyM1],
    '006': [Protocols.PsCARTHA],
    '007': [Protocols.PsDELPH1],
    '008': [Protocols.PtEdo2Zk],
    '009': [Protocols.PsFLorena],
    '010': [Protocols.PtGRANADs]
};
var DefaultLambdaAddresses;
(function (DefaultLambdaAddresses) {
    DefaultLambdaAddresses["MAINNET"] = "KT1CPuTzwC7h7uLXd5WQmpMFso1HxrLBUtpE";
    DefaultLambdaAddresses["CARTHAGENET"] = "KT1VAy1o1FGiXYfD3YT7x7k5eF5HSHhmc1u6";
    DefaultLambdaAddresses["DELPHINET"] = "KT19abMFs3haqyKYwqdLjK9GbtofryZLvpiK";
    DefaultLambdaAddresses["EDONET"] = "KT1A64nVZDccAHGAsf1ZyVajXZcbiwjV3SnN";
    DefaultLambdaAddresses["FLORENCENET"] = "KT1KCe3YqGnudsiCWb5twbe2DH5T3EMdLpSE";
    DefaultLambdaAddresses["GRANADANET"] = "KT1BCun2vsA4GBQvsKAuGD5x873MfW2jsN9z";
})(DefaultLambdaAddresses = exports.DefaultLambdaAddresses || (exports.DefaultLambdaAddresses = {}));
var ChainIds;
(function (ChainIds) {
    ChainIds["MAINNET"] = "NetXdQprcVkpaWU";
    ChainIds["CARTHAGENET"] = "NetXjD3HPJJjmcd";
    ChainIds["DELPHINET"] = "NetXm8tYqnMWky1";
    ChainIds["EDONET"] = "NetXSgo1ZT2DRUG";
    ChainIds["FLORENCENET"] = "NetXxkAx4woPLyu";
    ChainIds["GRANADANET"] = "NetXz969SFaFn8k";
})(ChainIds = exports.ChainIds || (exports.ChainIds = {}));
//# sourceMappingURL=constants.js.map