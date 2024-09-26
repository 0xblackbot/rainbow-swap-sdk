import {Address} from '@ton/core';

import {SwapParams, SwapStep} from './sdk';
import {packJettonSwap, packTonSwap} from './transfer-params-pack.utils';
import {dedust_getVaultAddress} from './vault.utils';
import {JETTON_TRANSFER_GAS_AMOUNT, REFERRAL_ADDRESS, TON} from '../../globals';
import {RouteStepWithCalculation} from '../../interfaces/route-step-with-calculation.interface';
import {
    getJettonTransferBody,
    getJettonWalletAddress
} from '../../utils/jetton.utils';
import {applySlippageTolerance} from '../shared/slippage-tolerance.utils';

const createNextSwapStepPayload = (
    remainingRoute: RouteStepWithCalculation[],
    slippageTolerance: number
): SwapStep | undefined => {
    if (remainingRoute.length === 0) {
        return undefined;
    }

    const routeStep = remainingRoute[0];

    const poolAddress = Address.parse(routeStep.dexPair.dexPairAddress);
    const limit = applySlippageTolerance(
        routeStep.outputAssetAmount,
        slippageTolerance
    );

    const next = createNextSwapStepPayload(
        remainingRoute.slice(1),
        slippageTolerance
    );

    return {
        poolAddress,
        limit,
        next
    };
};

export const dedust_getTransferParams = async (
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

    const vaultAddress = await dedust_getVaultAddress(
        firstRouteStep.inputAssetAddress
    );

    const poolAddress = Address.parse(firstRouteStep.dexPair.dexPairAddress);
    const minOutputAmount = applySlippageTolerance(
        firstRouteStep.outputAssetAmount,
        slippageTolerance
    );

    const nextSwapStep = createNextSwapStepPayload(
        route.slice(1),
        slippageTolerance
    );
    const swapParams: SwapParams = {
        recipientAddress: receiverAddress,
        referralAddress: REFERRAL_ADDRESS
    };

    if (firstRouteStep.inputAssetAddress === TON) {
        return {
            to: vaultAddress,
            value: gasAmount + BigInt(firstRouteStep.inputAssetAmount),
            body: packTonSwap({
                queryId,
                inputAmount: BigInt(firstRouteStep.inputAssetAmount),
                poolAddress,
                minOutputAmount,
                nextSwapStep,
                swapParams
            })
        };
    } else {
        const inputJettonWalletAddress = await getJettonWalletAddress(
            firstRouteStep.inputAssetAddress,
            senderAddress
        );

        const jettonSwapPayload = packJettonSwap({
            poolAddress,
            minOutputAmount,
            nextSwapStep,
            swapParams
        });

        return {
            to: inputJettonWalletAddress,
            value: gasAmount + JETTON_TRANSFER_GAS_AMOUNT,
            body: getJettonTransferBody({
                queryId,
                amount: BigInt(firstRouteStep.inputAssetAmount),
                destination: vaultAddress,
                responseDestination: responseDestination,
                forwardTonAmount: gasAmount,
                forwardPayload: jettonSwapPayload
            })
        };
    }
};
