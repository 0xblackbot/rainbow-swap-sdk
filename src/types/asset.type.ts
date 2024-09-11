export type Asset = {
    symbol: string;
    name: string;
    address: string;
    image: string;
    decimals: number;
    // asset to TON exchange rate
    exchangeRate: string;
    usdExchangeRate: number;
    verification: 'whitelist' | 'none';
};
