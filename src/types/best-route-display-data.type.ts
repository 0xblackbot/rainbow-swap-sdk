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
    routes: RouteDisplayData[];
};

export type RouteDisplayData = {
    inputPercent: number;
    routeSteps: RouteStepDisplayData[];
};

export type RouteStepDisplayData = {
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
};
