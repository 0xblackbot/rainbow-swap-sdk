import {TransferParams} from "../interfaces/transfer-params.interface";
import {Message} from "../interfaces/message.interface";
import {isDefined} from "@rnw-community/shared";
import {Address, beginCell, storeStateInit} from '@ton/core';
import {CalculatedSwapRoute} from "../types/calculated-swap-route.type";
import {
    getRainbowWalletActivationTransferParams,
    getSwapRouteTransferParams
} from "../dexes/shared/transfer-params.utils";

const transferParamsToMessages = (
    transferParamsArray: TransferParams[]
) =>
    transferParamsArray.map<Message>(transferParams => ({
        address: transferParams.to.toRawString(),
        amount: transferParams.value.toString(),
        payload: isDefined(transferParams.body)
            ? transferParams.body.toBoc().toString('base64')
            : undefined,
        stateInit: isDefined(transferParams.init)
            ? beginCell()
                .store(storeStateInit(transferParams.init))
                .endCell()
                .toBoc()
                .toString('base64')
            : undefined
    }));

export const getSwapMessages = async (
    senderAddress: string,
    bestRoute: CalculatedSwapRoute[],
    slippageTolerance: string
) => {
    const swapTransferParams = await Promise.all(
        bestRoute.map(swapRoute =>
            getSwapRouteTransferParams(
                swapRoute,
                Address.parse(senderAddress),
                slippageTolerance
            )
        )
    );

    return transferParamsToMessages(swapTransferParams);
};

export const getRainbowWalletActivationMessages = (senderAddress: string) => {
    const activationTransferParams = [
        getRainbowWalletActivationTransferParams(Address.parse(senderAddress))
    ];

    return transferParamsToMessages(activationTransferParams);
};
