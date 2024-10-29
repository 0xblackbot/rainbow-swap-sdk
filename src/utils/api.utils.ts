import {API} from '../globals';
import {AppStatus} from '../types/app-status.type';
import {Asset} from '../types/asset.type';
import {AssetsListParams} from '../types/assets-list-patams.type';
import {AssetsRecord} from '../types/assets-record.type';
import {BestRouteParams} from '../types/best-route-params.type';
import {BestRouteResponse} from '../types/best-route-response.type';

export const getAssetsRecord = () =>
    API.get<AssetsRecord>('/assets-record').then(response => response.data);

export const getAssetsList = (params: AssetsListParams) =>
    API.post<Asset[]>('/assets-list', params).then(response => response.data);

export const getBestRoute = (params: BestRouteParams) =>
    API.get<BestRouteResponse>('/best-route', {params}).then(
        response => response.data
    );

export const getAppStatus = () =>
    API.get<AppStatus>('/app-status').then(response => response.data);
