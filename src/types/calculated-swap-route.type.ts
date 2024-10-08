import {DeDustCalculatedSwapRoute} from '../dexes/dedust/calculated-swap-route.interface';
import {RainbowCalculatedSwapRoute} from '../dexes/rainbow/calculated-swap-route.interface';
import {StonCalculatedSwapRoute} from '../dexes/ston/calculated-swap-route.interface';
import {StonV2CalculatedSwapRoute} from '../dexes/ston-v2/calculated-swap-route.interface';

export type CalculatedSwapRoute =
    | DeDustCalculatedSwapRoute
    | StonCalculatedSwapRoute
    | StonV2CalculatedSwapRoute
    | RainbowCalculatedSwapRoute;
