export type Asset = {
    address: string;
    slug: string;
    symbol: string;
    name: string;
    image: string;
    decimals: number;
    exchangeRate: string; // asset to TON exchange rate
    usdExchangeRate: number;
    verification: 'whitelist' | 'none';
};
