import {SwapRouteType} from '../../enums/swap-route-type.enum';
import {RouteStepWithCalculation} from '../../interfaces/route-step-with-calculation.interface';
import {AbstractCalculatedSwapRoute} from '../abstract/calculated-swap-route.interface';

export interface StonV2CalculatedSwapRoute
    extends AbstractCalculatedSwapRoute<SwapRouteType.Ston_v2> {
    route: RouteStepWithCalculation[];
}
