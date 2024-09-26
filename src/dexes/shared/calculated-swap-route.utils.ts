import {SwapRouteType} from '../../enums/swap-route-type.enum';
import {RouteStepWithCalculation} from '../../interfaces/route-step-with-calculation.interface';
import {CalculatedSwapRoute} from '../../types/calculated-swap-route.type';
import {dedust_mapSwapRouteToRoute} from '../dedust/calculated-swap-route.utils';
import {rainbow_mapSwapRouteToRoute} from '../rainbow/calculated-swap-route.utils';
import {ston_mapSwapRouteToRoute} from '../ston/calculated-swap-route.utils';
import {stonV2_mapSwapRouteToRoute} from '../ston-v2/calculated-swap-route.utils';

const FnRecord: Record<
    SwapRouteType,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (swapRoute: any) => RouteStepWithCalculation[]
> = {
    [SwapRouteType.DeDust]: dedust_mapSwapRouteToRoute,
    [SwapRouteType.Ston]: ston_mapSwapRouteToRoute,
    [SwapRouteType.Ston_v2]: stonV2_mapSwapRouteToRoute,
    [SwapRouteType.Rainbow]: rainbow_mapSwapRouteToRoute
};

export const mapSwapRouteToRoute = (
    swapRoute: CalculatedSwapRoute
): RouteStepWithCalculation[] => {
    const fn = FnRecord[swapRoute.type];

    return fn(swapRoute);
};
