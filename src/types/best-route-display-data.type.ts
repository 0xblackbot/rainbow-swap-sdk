import {DexTypeEnum} from '../enums/dex-type.enum';

export type BestRouteDisplayData = {
    inputAssetAmount: number;
    inputAssetUsdAmount: number;
    outputAssetAmount: number;
    outputAssetUsdAmount: number;
    minOutputAssetAmount: number;
    exchangeRate: number;
    maxSlippage: number;
    routingFeePercent: number;
    priceImprovementPercent: number;
    roughGasFee: number;
    roughGasUsdFee: number;
    route: {
        inputPercent: number;
        routeSteps: {
            dex: {
                type: DexTypeEnum;
                address: string;
                name: string;
                image: string;
            };
            inputAsset: {
                address: string;
                symbol: string;
                name: string;
                image: string;
            };
            outputAsset: {
                address: string;
                symbol: string;
                name: string;
                image: string;
            };
        }[];
    }[];
};
