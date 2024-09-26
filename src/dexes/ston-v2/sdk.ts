import {Address, beginCell, Cell} from '@ton/core';

export const PROXY_TON_V2_MASTER_ADDRESS =
    'EQBnGWMCf3-FZZq1W4IWcWiGAc3PHuZ0_H-7sad2oY00o83S';

enum Operation {
    TON_TRANSFER = 0x01f3835d
}

interface pTonV2_TonTransferParams {
    queryId?: number;
    amount: bigint;
    refundAddress: Address;
    forwardPayload?: Cell;
}

export const pTonV2_createTonTransferBody = (
    params: pTonV2_TonTransferParams
) => {
    const builder = beginCell();

    builder.storeUint(Operation.TON_TRANSFER, 32);
    builder.storeUint(params.queryId ?? 0, 64);
    builder.storeCoins(params.amount);
    builder.storeAddress(params.refundAddress);

    if (params.forwardPayload) {
        builder.storeBit(true);
        builder.storeRef(params.forwardPayload);
    }

    return builder.endCell();
};
