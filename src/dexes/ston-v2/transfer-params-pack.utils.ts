import {Address, beginCell, Cell} from '@ton/core';

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

export const packSwapParams = (params: SwapParams) => {
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
