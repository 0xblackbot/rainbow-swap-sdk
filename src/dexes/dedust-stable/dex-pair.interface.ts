import {DexTypeEnum} from '../../enums/dex-type.enum';
import {SharedDexPair} from '../../types/dex-pair.type';

export interface dedustStable_DexPair
    extends SharedDexPair<DexTypeEnum.DeDustStable> {
    feeNumerator: string;
    feeDenominator: string;
    decimals0: string;
    decimals1: string;
}
