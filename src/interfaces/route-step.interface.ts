import {RouteDirectionEnum} from '../enums/route-direction.enum';
import {DexPair} from '../types/dex-pair.type';

export interface RouteStep {
    dexPair: DexPair;
    inputAssetAddress: string;
    outputAssetAddress: string;
    routeDirection: RouteDirectionEnum;
}
