# Rainbow Swap 🌈 SDK

This SDK is designed for building applications on top of [Rainbow Swap 🌈](https://github.com/0xblackbot/rainbow-swap) - The Next Gen DEX Aggregator on the TON blockchain 💎.

**We have plans to integrate commissions and share them with those who have integrated this SDK into their DApps.**

### Installation

To install the rainbow-swap-sdk, use the following npm command:
```shell
npm install rainbow-swap-sdk
```

### Integrate your dApp

```typescript
import {getSwapMessages} from 'rainbow-swap-sdk';

// 1. On page load: fetch the list of available tokens
const assetsRecord = await getAssetsRecord();

...

// 2. On wallet connection: check if `Rainbow Wallet` smart contract is active
const userAddress = 'UQDGGjjuwhikx8ZPJsrLbKXGq7mx26D8pK_l8GqBejzB52Pa'; // user wallet address
const isRainbowWalletActive = await getIsRainbowWalletActive(userAddress);

...

// 3. On input asset amount, input asset, or output asset change: fetch a new swap route
const params = {
  inputAssetAmount: '1000000000', // 1 TON in nano
  inputAssetAddress: 'ton', // TON
  outputAssetAddress: 'EQCxE6mUtQJKFnGfaROTKOt1lZbDiiX1kCixRv7Nw2Id_sDs' // USDT jetton master address
};
const bestRouteResponse = getBestRoute(params);

...

// 4. Generate sign request messages

// Check if `Rainbow Wallet` Smart Contract Activation is Required
const isActivationRequired = getIsActivationRequired(bestRouteResponse.bestRoute, isRainbowWalletActive);

if (isActivationRequired) {
    // If activation is required, the user needs to sign rainbowWalletActivationMessages first
    const activationMessages = getRainbowWalletActivationMessages(userAddress);
} else {
    // After the transaction is confirmed, or if activation is not required, the user can proceed with the swap transaction
    const slippageTolerance = '2.5'; // 2.5%
    const swapMessages = await getSwapMessages(
      userAddress,
      bestRouteResponse.bestRoute,
      slippageTolerance
    );
}
```

### Live example

For a live example of using the SDK, visit [Rainbow Swap repository](https://github.com/0xblackbot/rainbow-swap).

### Contact

For questions and suggestions, contact us at [Blackbot](https://blackbot.technology/).

### License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.
