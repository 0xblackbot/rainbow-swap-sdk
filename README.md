# Rainbow Swap 🌈 SDK

This SDK is designed for building applications on top of [Rainbow.ag](https://github.com/0xblackbot/rainbow-swap) - Swap Aggregator on TON blockchain 💎.

---

**To receive your `partnerId`, set custom fees, and enjoy a 50% revenue share, contact us in our [Community Chat](https://t.me/rainbow_swap_chat).**

---

[![npm version](https://badge.fury.io/js/rainbow-swap-sdk.svg)](https://badge.fury.io/js/rainbow-swap-sdk)
![NPM License](https://img.shields.io/npm/l/rainbow-swap-sdk)

## Docs

- SDK guide: https://rainbow-ag.gitbook.io/docs/technical/sdk
- Full docs: https://rainbow-ag.gitbook.io/docs

## Quick links

- Support: https://t.me/rainbow_swap_manager

## Installation

You can install the Rainbow Swap SDK using either npm or Yarn:

**Using npm:**

```shell
npm install rainbow-swap-sdk
```

**Using Yarn:**

```shell
yarn add rainbow-swap-sdk
```

## What you get

- Typed API helpers for assets, routes, and swap history.
- Utilities for TON amount conversion (`toNano`, `fromNano`).
- Enum/type exports to keep your integration strongly typed.

## Integrate your dApp

### Example: swapping 1.35 TON to USDT

```typescript
import {getAssetsList, getBestRoute, toNano} from 'rainbow-swap-sdk';

// 1. Load the list of available tokens
const assetsList = await getAssetsList({
    userAssets: [] // Array of asset addresses the user holds; see AssetsListParams for more details.
});

// Retrieve specific assets by their address
const inputAsset = assetsList.find(asset => asset.address === 'ton');
const outputAsset = assetsList.find(
    asset =>
        asset.address === 'EQCxE6mUtQJKFnGfaROTKOt1lZbDiiX1kCixRv7Nw2Id_sDs'
);

// 2. Load the best swap route and swap messages
const bestRouteResponse = await getBestRoute({
    inputAssetAmount: toNano('1.35', inputAsset.decimals).toString(), // Convert 1.35 TON to nano format
    inputAssetAddress: inputAsset.address,
    outputAssetAddress: outputAsset.address,
    senderAddress: 'UQDGGjjuwhikx8ZPJsrLbKXGq7mx26D8pK_l8GqBejzB52Pa', // Optional user wallet address; if set, swap messages will be returned
    partnerId: 'demo-partner' // Optional unique identifier in our App Developer Partnership program
});

// 3. Sign and send messages to the blockchain to execute the swap.
// This example uses the React UI client. For other frameworks, refer to https://docs.ton.org/develop/dapps/ton-connect/overview
import {useTonConnectUI} from '@tonconnect/ui-react';

const [tonConnectUI] = useTonConnectUI();

const result = await tonConnectUI.sendTransaction({
    validUntil: Math.floor(Date.now() / 1000) + 60, // 60 seconds from now
    messages: bestRouteResponse.swapMessages
});
```

## API overview

### Assets

```typescript
import {getAssetsList} from 'rainbow-swap-sdk';

const assets = await getAssetsList({
    userAssets: ['ton'], // optional: user-held assets
    searchValue: 'USDT', // optional: filter by name/symbol/address
    limit: 100 // optional: 10..200
});
```

### Best route

```typescript
import {getBestRoute, toNano} from 'rainbow-swap-sdk';

const route = await getBestRoute({
    inputAssetAmount: toNano('1.35', 9).toString(),
    inputAssetAddress: 'ton',
    outputAssetAddress: 'EQCxE6mUtQJKFnGfaROTKOt1lZbDiiX1kCixRv7Nw2Id_sDs',
    senderAddress: 'UQDGGjjuwhikx8ZPJsrLbKXGq7mx26D8pK_l8GqBejzB52Pa',
    maxSlippage: 1.5,
    partnerId: 'demo-partner'
});
```

### Swap history

```typescript
import {getSwapHistoryData} from 'rainbow-swap-sdk';

const history = await getSwapHistoryData({
    bocHash: '64c1a1c5b7c2f8...'
});
```

## Application Status Check

You may want to check the status of your application to ensure everything is functioning correctly. For example, temporarily disable swaps if block production on TON is disrupted due to an external event like the DOGS listing.

```typescript
import {getAppStatus} from 'rainbow-swap-sdk';

const {
    isSwapsEnabled, // true if everything is working fine
    message // Explanation of why swaps are disabled, if applicable
} = await getAppStatus();
```

## Notes

- `getAssetsRecord` is deprecated; use `getAssetsList` instead.
- `getBestRoute` returns `swapMessages` only when `senderAddress` is provided.
- Requests to `getAssetsList` and `getBestRoute` cancel any previous in-flight request.

## Live Example

For a live example of using the SDK, visit the [Rainbow Swap 🌈 Repository](https://github.com/0xblackbot/rainbow-swap).

## Contact

For questions and suggestions, visit [Community Chat](https://t.me/rainbow_swap_chat).

## License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.
