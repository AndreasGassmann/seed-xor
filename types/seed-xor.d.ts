export declare const split: (mnemonic: string, numberOfShares?: 2 | 3 | 4, useRandom?: boolean) => Promise<string[]>;
export declare const combine: (shares: string[]) => Promise<string>;
