import {SwapRouteType} from "../../enums/swap-route-type.enum";
import {AbstractCalculatedSwapRoute} from "../abstract/calculated-swap-route.interface";
import {RouteStepWithCalculation} from "../../interfaces/route-step-with-calculation.interface";

export interface RainbowCalculatedSwapRoute
    extends AbstractCalculatedSwapRoute<SwapRouteType.Rainbow> {
    firstChunk: RouteStepWithCalculation[];
    secondChunk: RouteStepWithCalculation[];
}
