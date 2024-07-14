import {CalculatedSwapRoute} from './calculated-swap-route.type';

export type BestRouteResponse = {
    bestRoute: CalculatedSwapRoute[];
    priceImprovement: number;
};
