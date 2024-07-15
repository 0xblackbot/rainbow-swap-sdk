import {Address} from '@ton/core';

import {RainbowWalletContract} from '../dexes/rainbow/rainbow-wallet.contract';
import {SwapRouteType} from '../enums/swap-route-type.enum';
import {TON_CLIENT, WORKCHAIN} from '../globals';
import {CalculatedSwapRoute} from '../types/calculated-swap-route.type';

export const getIsRainbowWalletActive = async (ownerAddress: string) => {
    const rainbowWallet = RainbowWalletContract.create({
        workchain: WORKCHAIN,
        ownerAddress: Address.parse(ownerAddress)
    });

    const contractProvider = TON_CLIENT.provider(rainbowWallet.address);
    const state = await contractProvider.getState();

    return state.state.type === 'active';
};

export const getIsActivationRequired = (
    bestRoute: CalculatedSwapRoute[],
    isRainbowWalletActive: boolean
) => {
    const isRainbowContractCalled = bestRoute.some(
        swapRoute => swapRoute.type === SwapRouteType.Rainbow
    );

    return isRainbowContractCalled && !isRainbowWalletActive;
};
