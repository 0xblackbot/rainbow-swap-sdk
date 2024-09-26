import {Address} from '@ton/core';

import {PROXY_TON_V2_MASTER_ADDRESS, pTonV2_createTonTransferBody} from './sdk';
import {packSwapParams} from './transfer-params-pack.utils';
import {DexTypeEnum} from '../../enums/dex-type.enum';
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
import {applySlippageTolerance} from '../shared/slippage-tolerance.utils';

export const stonV2_getTransferParams = async (
    route: RouteStepWithCalculation[],
    queryId: number,
    gasAmount: bigint,
    senderAddress: Address,
    receiverAddress: Address,
    responseDestination: Address,
    slippageTolerance: number
) => {
    if (route.length !== 1) {
        throw new Error('Only 1 step route is supported rn');
    }

    const routeStep = route[0];

    if (routeStep.dexPair.dexType !== DexTypeEnum.Ston_v2) {
        throw new Error(
            `Unsupported dexType ${routeStep.dexPair.dexType}, ${DexTypeEnum.Ston_v2} expected`
        );
    }

    const routerAddress = Address.parse(routeStep.dexPair.routerAddress);
    const minOutputAmount = applySlippageTolerance(
        routeStep.outputAssetAmount,
        slippageTolerance
    );

    if (routeStep.inputAssetAddress === TON) {
        const stonRouterProxyTonWalletAddress = await getJettonWalletAddress(
            PROXY_TON_V2_MASTER_ADDRESS,
            routerAddress
        );

        const stonRouterOutputJettonWalletAddress =
            await getJettonWalletAddress(
                routeStep.outputAssetAddress,
                routerAddress
            );

        const tonSwapPayload = packSwapParams({
            outputJettonWalletAddress: stonRouterOutputJettonWalletAddress,
            receiverAddress,
            minOutputAmount,
            refundAddress: responseDestination,
            referralAddress: REFERRAL_ADDRESS,
            referralValue: REFERRAL_VALUE
        });

        return {
            to: stonRouterProxyTonWalletAddress,
            value: gasAmount + BigInt(routeStep.inputAssetAmount),
            body: pTonV2_createTonTransferBody({
                queryId,
                amount: BigInt(routeStep.inputAssetAmount),
                refundAddress: responseDestination,
                forwardPayload: tonSwapPayload
            })
        };
    } else {
        const inputJettonWalletAddress = await getJettonWalletAddress(
            routeStep.inputAssetAddress,
            senderAddress
        );
        const outputJettonWalletAddress = await getJettonWalletAddress(
            routeStep.outputAssetAddress === TON
                ? PROXY_TON_V2_MASTER_ADDRESS
                : routeStep.outputAssetAddress,
            routerAddress
        );

        const jettonSwapPayload = packSwapParams({
            outputJettonWalletAddress,
            receiverAddress,
            minOutputAmount,
            refundAddress: responseDestination,
            referralAddress: REFERRAL_ADDRESS,
            referralValue: REFERRAL_VALUE
        });

        return {
            to: inputJettonWalletAddress,
            value: gasAmount + JETTON_TRANSFER_GAS_AMOUNT,
            body: getJettonTransferBody({
                queryId,
                amount: BigInt(routeStep.inputAssetAmount),
                destination: routerAddress,
                responseDestination: responseDestination,
                forwardTonAmount: gasAmount,
                forwardPayload: jettonSwapPayload
            })
        };
    }
};
