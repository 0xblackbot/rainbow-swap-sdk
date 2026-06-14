export type Asset = {
    address: string;
    slug: string;
    symbol: string;
    name: string;
    image: string;
    decimals: number;
    exchangeRate: string; // asset to GRAM exchange rate
    usdExchangeRate: number;
    verification: 'whitelist' | 'none';
    totalSupply: string; // nano format
    fdv: number; // value in USD
};
