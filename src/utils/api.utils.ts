import {API} from '../globals';
import {AppStatus} from '../types/app-status.type';
import {Asset} from '../types/asset.type';
import {AssetsListParams} from '../types/assets-list-patams.type';
import {AssetsRecord} from '../types/assets-record.type';
import {BestRouteParams} from '../types/best-route-params.type';
import {BestRouteResponse} from '../types/best-route-response.type';

export const getAppStatus = () =>
    API.get<AppStatus>('/app-status').then(response => response.data);

/**
 * @deprecated This method is deprecated and will be removed in the next major release.
 * Please use `getAssetsList` instead for improved performance and features.
 */
export const getAssetsRecord = () =>
    API.get<AssetsRecord>('/assets-record').then(response => response.data);

// Used to cancel the previous request if it exists
const abortControllers: Record<
    'assetsList' | 'bestRoute',
    AbortController | null
> = {
    assetsList: null,
    bestRoute: null
};

export const getAssetsList = (params: AssetsListParams) => {
    if (abortControllers.assetsList) {
        abortControllers.assetsList.abort();
    }
    abortControllers.assetsList = new AbortController();

    return API.post<Asset[]>('/assets-list', params, {
        signal: abortControllers.assetsList.signal
    }).then(response => response.data);
};

export const getBestRoute = (params: BestRouteParams, authTokens?: string) => {
    if (abortControllers.bestRoute) {
        abortControllers.bestRoute.abort();
    }
    abortControllers.bestRoute = new AbortController();

    return API.get<BestRouteResponse>('/best-route', {
        params,
        signal: abortControllers.bestRoute.signal,
        headers: {
            Authorization: authTokens
        }
    }).then(response => response.data);
};
