export type AssetsListParams = {
    /**
     * A list of asset addresses that the user holds balances in.
     *
     * **Example values:**
     * - `'ton'` for TON.
     * - `'EQCxE6mUtQJKFnGfaROTKOt1lZbDiiX1kCixRv7Nw2Id_sDs'` for USDT.
     *
     * **Default:** An empty array (`[]`), indicating no specified user assets.
     */
    userAssets?: string[];

    /**
     * A text string used to filter assets by symbol, name, or address.
     *
     * **Default:** An empty string (`''`), indicating no specific filter applied.
     */
    searchValue?: string;

    /**
     * The maximum number of assets (excluding user-owned) to return in the response.
     * Acceptable values range from 10 to 200.
     *
     * **Default:** `100`
     */
    limit?: number;
};
