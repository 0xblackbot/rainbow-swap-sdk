import {Address, toNano} from '@ton/core';

import {SwapRouteType} from '../../enums/swap-route-type.enum';
import {GAS_AMOUNT, WORKCHAIN} from '../../globals';
import {TransferParams} from '../../interfaces/transfer-params.interface';
import {CalculatedSwapRoute} from '../../types/calculated-swap-route.type';
import {getQueryId} from '../../utils/transfer-params.utils';
import {dedust_getTransferParams} from '../dedust/transfer-params.utils';
import {RainbowWalletContract} from '../rainbow/rainbow-wallet.contract';
import {rainbow_getTransferParams} from '../rainbow/transfer-params.utils';
import {ston_getTransferParams} from '../ston/transfer-params.utils';
import {stonV2_getTransferParams} from '../ston-v2/transfer-params.utils';

export const getSwapRouteTransferParams = (
    swapRoute: CalculatedSwapRoute,
    senderAddress: Address,
    slippageTolerance: number
) => {
    const queryId = getQueryId();
    if (swapRoute.type === SwapRouteType.DeDust) {
        return dedust_getTransferParams(
            swapRoute.route,
            queryId,
            GAS_AMOUNT,
            senderAddress,
            senderAddress,
            senderAddress,
            slippageTolerance
        );
    }
    if (swapRoute.type === SwapRouteType.Ston) {
        return ston_getTransferParams(
            swapRoute.routeStep,
            queryId,
            GAS_AMOUNT,
            senderAddress,
            senderAddress,
            senderAddress,
            slippageTolerance
        );
    }
    if (swapRoute.type === SwapRouteType.Ston_v2) {
        return stonV2_getTransferParams(
            swapRoute.route,
            queryId,
            GAS_AMOUNT,
            senderAddress,
            senderAddress,
            senderAddress,
            slippageTolerance
        );
    }

    return rainbow_getTransferParams(
        swapRoute.firstChunk,
        swapRoute.secondChunk,
        queryId,
        GAS_AMOUNT,
        senderAddress,
        slippageTolerance
    );
};

export const getRainbowWalletActivationTransferParams = (
    senderAddress: Address
): TransferParams => {
    const rainbowWallet = RainbowWalletContract.create({
        workchain: WORKCHAIN,
        ownerAddress: senderAddress
    });

    return {
        to: rainbowWallet.address,
        value: toNano('0.01'),
        init: rainbowWallet.init
    };
};
