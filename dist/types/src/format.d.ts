import BigNumber from 'bignumber.js';
declare type Format = 'tz' | 'mtz' | 'mutez';
export declare function format(from: Format, to: Format, amount: number | string | BigNumber): string | number | BigNumber;
export {};
