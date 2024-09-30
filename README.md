# Rainbow Swap 🌈 SDK

This SDK is designed for building applications on top of [Rainbow Swap 🌈](https://github.com/0xblackbot/rainbow-swap) - The Next Gen DEX Aggregator on the TON blockchain 💎.

--- 

**We have plans to integrate commissions and share them with those who have integrated this SDK into their DApps.**

---

[![npm version](https://badge.fury.io/js/rainbow-swap-sdk.svg)](https://badge.fury.io/js/rainbow-swap-sdk)
![NPM License](https://img.shields.io/npm/l/rainbow-swap-sdk)

### Installation

To install the rainbow-swap-sdk, use the following npm command:
```shell
npm install rainbow-swap-sdk
```

### Integrate your dApp

```typescript
import {
    getAssetsRecord,
    getBestRoute
} from 'rainbow-swap-sdk';

// 1. Load the list of available tokens
const assetsRecord = await getAssetsRecord();

...

// 2. Load the best swap route & swap messages
const params = {
  inputAssetAmount: '1000000000', // 1 TON in nano
  inputAssetAddress: 'ton', // TON
  outputAssetAddress: 'EQCxE6mUtQJKFnGfaROTKOt1lZbDiiX1kCixRv7Nw2Id_sDs', // USDT jetton master address
  maxDepth: 2, // optional number of maximum route length (should be in range from 1 to 3)
  userAddress: 'UQDGGjjuwhikx8ZPJsrLbKXGq7mx26D8pK_l8GqBejzB52Pa', // optional user wallet address, if set - swapMessages will return
  slippageTolerance: 5 // optional max slippage value (should be in range )
};

const bestRouteResponse = await getBestRoute(params);

const bestRoute = bestRouteResponse.bestRoute; // Route of the best possible swap route
const swapMessages = bestRouteResponse.swapMessages; // Array of messages that should be sent to @tonconnect
```

### Application status check

Additionally, you might want to check if everything is functioning correctly. For instance, you could temporarily disable swaps if block production on TON is disrupted due to the DOGS listing.

```typescript
import { getAppStatus } from 'rainbow-swap-sdk';

const {
    isSwapsEnabled, // true - if everything works fine
    message // explanations why swaps are disabled
} = await getAppStatus();
```

### Live example

For a live example of using the SDK, visit [Rainbow Swap 🌈 repository](https://github.com/0xblackbot/rainbow-swap).

### Contact

For questions and suggestions, contact us at [Blackbot](https://blackbot.technology/).

### License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.
