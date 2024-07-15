import {API} from '../globals';
import {AssetsRecord} from '../types/assets-record.type';
import {BestRouteResponse} from '../types/best-route-response.type';

export const getAssetsRecord = () =>
    API.get<AssetsRecord>('/assets-record').then(
        response => response.data
    );

export const getBestRoute = (params: {
    inputAssetAmount: string;
    inputAssetAddress: string;
    outputAssetAddress: string;
}) =>
    API.get<BestRouteResponse>('/best-route', {params}).then(
        response => response.data
    );
