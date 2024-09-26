import {DexTypeEnum} from '../../enums/dex-type.enum';
import {SharedDexPair} from '../../types/dex-pair.type';

export interface stonV2_DexPair extends SharedDexPair<DexTypeEnum.Ston_v2> {
    routerAddress: string;
}
