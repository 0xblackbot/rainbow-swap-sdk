import {API} from '../globals';
import {AssetsRecordResponse} from '../types/assets-record-response.type';
import {BestRouteResponse} from '../types/best-route-response.type';

export const getAssetsRecord = () =>
    API.get<AssetsRecordResponse>('/assets-record')
        .then(response => response.data);

export const getBestRoute = (params: {
    inputAssetAmount: string;
    inputAssetAddress: string;
    outputAssetAddress: string;
}) => API.get<BestRouteResponse>('/best-route', {params})
    .then(response => response.data);
