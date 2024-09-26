import {DexTypeEnum} from '../../enums/dex-type.enum';
import {SharedDexPair} from '../../types/dex-pair.type';

export interface dedust_DexPair extends SharedDexPair<DexTypeEnum.DeDust> {
    feeNumerator: string;
    feeDenominator: string;
}
