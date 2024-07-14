import {API} from "../globals";
import {BestRouteResponse} from "../types/best-route-response.type";
import {AssetsRecordResponse} from "../types/assets-record-response.type";

export const getAssetsRecord = () => API.get<AssetsRecordResponse>('/assets-record');

export const getBestRoute = (params: {
    inputAssetAmount: string;
    inputAssetAddress: string;
    outputAssetAddress: string;
}) => API.get<BestRouteResponse>('/best-route', {params});
