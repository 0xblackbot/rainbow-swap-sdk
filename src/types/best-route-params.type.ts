export type BestRouteParams = {
    /**
     * The amount of the input asset that the user wants to send, specified in nano units.
     * This should be a string representation of a bigint value.
     *
     * **Example:** `'1350000000'` (represents 1.35 TON in nano).
     */
    inputAssetAmount: string;

    /**
     * The address or identifier of the asset that the user wants to send.
     *
     * **Example:**
     * - `'ton'` for TON.
     * - `'EQCxE6mUtQJKFnGfaROTKOt1lZbDiiX1kCixRv7Nw2Id_sDs'` for USDT.
     */
    inputAssetAddress: string;

    /**
     * The address or identifier of the asset that the user wants to receive.
     *
     * **Example:**
     * - `'ton'` for TON.
     * - `'EQCxE6mUtQJKFnGfaROTKOt1lZbDiiX1kCixRv7Nw2Id_sDs'` for USDT.
     */
    outputAssetAddress: string;

    /**
     * (Optional) The maximum length of the route.
     * Should be a number between **1 and 3** (inclusive).
     *
     * **Default:** `2`
     */
    maxDepth?: number;

    /**
     * (Optional) The maximum splits of the route.
     * Should be a number between **1 and 4** (inclusive).
     *
     * **Default:** `4`
     */
    maxSplits?: number;

    /**
     * (Optional) The wallet address of the user.
     * If not provided, the `swapMessages` will return an empty array (`[]`).
     */
    senderAddress?: string;

    /**
     * (Optional) The percentage setting for slippage tolerance.
     * Should be a number between **0 and 100** (inclusive).
     *
     * **Example:** `1.5` for 1.5% slippage tolerance.
     *
     * **Default:** `5`
     */
    maxSlippage?: number;

    /**
     * (Optional) The referral address of a user.
     * Refer a new user and earn a share of their trading fees.
     *
     * For more details, visit the **Rewards Center** at [rainbow.ag](https://rainbow.ag).
     */
    referralAddress?: string;

    /**
     * (Optional) A unique identifier in our App Developer Partnership program.
     * Integrate our SDK to enable in-app swaps, set custom fees, and enjoy a 50% revenue share.
     *
     * For more details, contact us at **Community Chat**: [https://t.me/rainbow_swap_chat](https://t.me/rainbow_swap_chat).
     */
    partnerId?: string;
};
