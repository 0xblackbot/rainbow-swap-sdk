import {CalculatedSwapRoute} from './calculated-swap-route.type';
import {Message} from '../interfaces/message.interface';

export type BestRouteResponse = {
    bestRoute: CalculatedSwapRoute[];
    priceImprovement: number;
    swapMessages: Message[];
};
