import {dedust_DexPair} from '../dexes/dedust/dex-pair.interface';
import {dedustStable_DexPair} from '../dexes/dedust-stable/dex-pair.interface';
import {ston_DexPair} from '../dexes/ston/dex-pair.interface';
import {stonV2_DexPair} from '../dexes/ston-v2/dex-pair.interface';
import {DexTypeEnum} from '../enums/dex-type.enum';

export interface SharedDexPair<T extends DexTypeEnum> {
    dexType: T;
    dexPairAddress: string;
    aAssetAddress: string;
    bAssetAddress: string;
}

export type DexPair =
    | dedust_DexPair
    | dedustStable_DexPair
    | ston_DexPair
    | stonV2_DexPair;
