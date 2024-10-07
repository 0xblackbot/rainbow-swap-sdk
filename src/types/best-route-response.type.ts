import {CalculatedSwapRoute} from './calculated-swap-route.type';
import {Message} from '../interfaces/message.interface';

export type BestRouteResponse = {
    bestRoute: CalculatedSwapRoute[];
    displayData: {
        inputAssetAmount: number;
        inputAssetUsdAmount: number;
        outputAssetAmount: number;
        outputAssetUsdAmount: number;
        minOutputAssetAmount: number;
        exchangeRate: number;
        maxSlippage: number;
        routingFee: number;
        priceImprovement: number;
    }
    swapMessages: Message[];
};
