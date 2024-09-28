import {isDefined} from '@rnw-community/shared';
import {Address, beginCell, Cell} from '@ton/core';

import {PROXY_TON_V2_MASTER_ADDRESS} from './sdk';
import {DexTypeEnum} from '../../enums/dex-type.enum';
import {TON} from '../../globals';
import {RouteStepWithCalculation} from '../../interfaces/route-step-with-calculation.interface';
import {getJettonWalletAddress} from '../../utils/jetton.utils';
import {applySlippageTolerance} from '../shared/slippage-tolerance.utils';

const TX_DEADLINE = 15 * 60; // 15 minutes
const getDefaultDeadline = () => Math.floor(Date.now() / 1000) + TX_DEADLINE;

enum Operation {
    SWAP = 0x6664de2a
}

interface SwapParams {
    outputJettonWalletAddress: Address;
    receiverAddress: Address;
    minOutputAmount: bigint;
    refundAddress: Address;
    excessesAddress?: Address;
    dexCustomPayload?: Cell;
    dexCustomPayloadForwardGasAmount?: bigint;
    refundPayload?: Cell;
    refundForwardGasAmount?: bigint;
    referralAddress: Address | null;
    referralValue: bigint;
    deadline?: number;
}

const routeStep_packSwapParams = (params: SwapParams) => {
    if (params.referralValue < 0 || params.referralValue > 100) {
        throw Error(`'referralValue' should be in range [0, 100] BPS`);
    }

    return beginCell()
        .storeUint(Operation.SWAP, 32)
        .storeAddress(params.outputJettonWalletAddress)
        .storeAddress(params.refundAddress)
        .storeAddress(params.excessesAddress ?? params.refundAddress)
        .storeUint(params.deadline ?? getDefaultDeadline(), 64)
        .storeRef(
            beginCell()
                .storeCoins(params.minOutputAmount)
                .storeAddress(params.receiverAddress)
                .storeCoins(params.dexCustomPayloadForwardGasAmount ?? 0)
                .storeMaybeRef(params.dexCustomPayload)
                .storeCoins(params.refundForwardGasAmount ?? 0)
                .storeMaybeRef(params.refundPayload)
                .storeUint(params.referralValue, 16)
                .storeAddress(params.referralAddress)
                .endCell()
        )
        .endCell();
};

export const getRouterAddress = (routeStep: RouteStepWithCalculation) => {
    if (routeStep.dexPair.dexType !== DexTypeEnum.Ston_v2) {
        throw new Error(
            `Unsupported dexType ${routeStep.dexPair.dexType}, ${DexTypeEnum.Ston_v2} expected`
        );
    }

    return Address.parse(routeStep.dexPair.routerAddress);
};

const getOutputJettonWalletAddress = (routeStep: RouteStepWithCalculation) => {
    const routerAddress = getRouterAddress(routeStep);

    const jettonMasterAddress =
        routeStep.outputAssetAddress === TON
            ? PROXY_TON_V2_MASTER_ADDRESS
            : routeStep.outputAssetAddress;

    return getJettonWalletAddress(jettonMasterAddress, routerAddress);
};

const getNextReceiverAddress = async (
    receiverAddress: Address,
    nextStep: RouteStepWithCalculation | undefined
) => {
    if (isDefined(nextStep)) {
        const routerAddress = getRouterAddress(nextStep);

        if (nextStep.inputAssetAddress === TON) {
            return getJettonWalletAddress(
                PROXY_TON_V2_MASTER_ADDRESS,
                routerAddress
            );
        } else {
            return routerAddress;
        }
    }

    return receiverAddress;
};

export const packSwapParams = async (
    remainingRoute: RouteStepWithCalculation[],
    routeStepGasAmount: bigint,
    receiverAddress: Address,
    responseDestination: Address,
    referralAddress: Address,
    referralValue: bigint,
    slippageTolerance: number
): Promise<Cell | undefined> => {
    if (remainingRoute.length === 0) {
        return undefined;
    }
    const routeStep = remainingRoute[0];

    const outputJettonWalletAddress =
        await getOutputJettonWalletAddress(routeStep);
    const nextReceiverAddress = await getNextReceiverAddress(
        receiverAddress,
        remainingRoute[1]
    );
    const minOutputAmount = applySlippageTolerance(
        routeStep.outputAssetAmount,
        slippageTolerance
    );
    const dexCustomPayload = await packSwapParams(
        remainingRoute.slice(1),
        routeStepGasAmount,
        receiverAddress,
        responseDestination,
        referralAddress,
        referralValue,
        slippageTolerance
    );
    const dexCustomPayloadForwardGasAmount =
        routeStepGasAmount * BigInt(remainingRoute.length - 1);

    return routeStep_packSwapParams({
        outputJettonWalletAddress,
        receiverAddress: nextReceiverAddress,
        minOutputAmount,
        refundAddress: responseDestination,
        dexCustomPayload,
        dexCustomPayloadForwardGasAmount,
        referralAddress,
        referralValue
    });
};
