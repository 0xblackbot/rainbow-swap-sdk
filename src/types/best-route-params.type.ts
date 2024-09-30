export type BestRouteParams = {
    inputAssetAmount: string;
    inputAssetAddress: string;
    outputAssetAddress: string;
    maxDepth?: number;
    senderAddress?: string;
    maxSlippage?: number;
};
