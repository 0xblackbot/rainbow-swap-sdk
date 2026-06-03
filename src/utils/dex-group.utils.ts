import {BestRouteParams} from '../types/best-route-params.type';
import {DEX_GROUPS} from '../types/dex-group.type';

export const getDisabledDexTypesParam = (
    disabledDexGroups: BestRouteParams['disabledDexGroups']
) => {
    if (!disabledDexGroups?.length) {
        return undefined;
    }

    const disabledDexGroupIds = new Set(disabledDexGroups);
    const disabledDexTypes = new Set(
        DEX_GROUPS.flatMap(dexGroup =>
            disabledDexGroupIds.has(dexGroup.id) ? dexGroup.dexTypes : []
        )
    );

    return Array.from(disabledDexTypes);
};
