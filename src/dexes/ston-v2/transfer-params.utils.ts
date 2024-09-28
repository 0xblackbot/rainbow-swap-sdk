import {isDefined} from '@rnw-community/shared';
import {Address, toNano} from '@ton/core';

import {PROXY_TON_V2_MASTER_ADDRESS, pTonV2_createTonTransferBody} from './sdk';
import {getRouterAddress, packSwapParams} from './transfer-params-pack.utils';
import {
    JETTON_TRANSFER_GAS_AMOUNT,
    REFERRAL_ADDRESS,
    REFERRAL_VALUE,
    TON
} from '../../globals';
import {RouteStepWithCalculation} from '../../interfaces/route-step-with-calculation.interface';
import {
    getJettonTransferBody,
    getJettonWalletAddress
} from '../../utils/jetton.utils';

const ROUTE_STEP_GAS_AMOUNT = toNano('0.30');

export const stonV2_getTransferParams = async (
    route: RouteStepWithCalculation[],
    queryId: number,
    gasAmount: bigint,
    senderAddress: Address,
    receiverAddress: Address,
    responseDestination: Address,
    slippageTolerance: number
) => {
    if (route.length === 0) {
        throw new Error('Empty route');
    }

    const firstRouteStep = route[0];

    const routerAddress = getRouterAddress(firstRouteStep);
    const additionalGasAmount =
        ROUTE_STEP_GAS_AMOUNT * BigInt(route.length - 1);

    const swapPayload = await packSwapParams(
        route,
        ROUTE_STEP_GAS_AMOUNT,
        receiverAddress,
        responseDestination,
        REFERRAL_ADDRESS,
        REFERRAL_VALUE,
        slippageTolerance
    );

    if (!isDefined(swapPayload)) {
        throw new Error('swapPayload not defined');
    }

    if (firstRouteStep.inputAssetAddress === TON) {
        const stonRouterProxyTonWalletAddress = await getJettonWalletAddress(
            PROXY_TON_V2_MASTER_ADDRESS,
            routerAddress
        );

        return {
            to: stonRouterProxyTonWalletAddress,
            value:
                gasAmount +
                additionalGasAmount +
                BigInt(firstRouteStep.inputAssetAmount),
            body: pTonV2_createTonTransferBody({
                queryId,
                amount: BigInt(firstRouteStep.inputAssetAmount),
                refundAddress: responseDestination,
                forwardPayload: swapPayload
            })
        };
    } else {
        const inputJettonWalletAddress = await getJettonWalletAddress(
            firstRouteStep.inputAssetAddress,
            senderAddress
        );

        return {
            to: inputJettonWalletAddress,
            value: gasAmount + JETTON_TRANSFER_GAS_AMOUNT + additionalGasAmount,
            body: getJettonTransferBody({
                queryId,
                amount: BigInt(firstRouteStep.inputAssetAmount),
                destination: routerAddress,
                responseDestination: responseDestination,
                forwardTonAmount: gasAmount + additionalGasAmount,
                forwardPayload: swapPayload
            })
        };
    }
};
