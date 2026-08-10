import {DexGroupIdEnum} from '../enums/dex-group-id.enum';
import {DexTypeEnum} from '../enums/dex-type.enum';

export type DexGroup = {
    id: DexGroupIdEnum;
    name: string;
    image: string;
    dexTypes: readonly DexTypeEnum[];
};

export const DEX_GROUPS: readonly DexGroup[] = [
    {
        id: DexGroupIdEnum.Ston,
        name: 'StonFi',
        image: 'https://raw.githubusercontent.com/0xblackbot/rainbow-swap/refs/heads/main/public/external-assets/ston-v2.png',
        dexTypes: [DexTypeEnum.Ston]
    },
    {
        id: DexGroupIdEnum.StonV2,
        name: 'StonFi v2',
        image: 'https://raw.githubusercontent.com/0xblackbot/rainbow-swap/refs/heads/main/public/external-assets/ston-v2.png',
        dexTypes: [
            DexTypeEnum.Ston_v2,
            DexTypeEnum.StonStable,
            DexTypeEnum.StonWeightedStable
        ]
    },
    {
        id: DexGroupIdEnum.DeDust,
        name: 'DeDust',
        image: 'https://raw.githubusercontent.com/0xblackbot/rainbow-swap/refs/heads/main/public/external-assets/dedust.png',
        dexTypes: [DexTypeEnum.DeDust, DexTypeEnum.DeDustStable]
    },
    {
        id: DexGroupIdEnum.DeDustV2,
        name: 'DeDust v2',
        image: 'https://raw.githubusercontent.com/0xblackbot/rainbow-swap/refs/heads/main/public/external-assets/dedust.png',
        dexTypes: [DexTypeEnum.DeDustCpmmV2]
    },
    {
        id: DexGroupIdEnum.Tonco,
        name: 'Tonco',
        image: 'https://raw.githubusercontent.com/0xblackbot/rainbow-swap/refs/heads/main/public/external-assets/tonco.jpg',
        dexTypes: [DexTypeEnum.Tonco, DexTypeEnum.Tonco_v1_6]
    },
    {
        id: DexGroupIdEnum.Bidask,
        name: 'Bidask',
        image: 'https://raw.githubusercontent.com/0xblackbot/rainbow-swap/refs/heads/main/public/external-assets/bidask.png',
        dexTypes: [DexTypeEnum.BidaskDamm, DexTypeEnum.BidaskDlmm]
    },
    {
        id: DexGroupIdEnum.Torch,
        name: 'Torch Finance',
        image: 'https://raw.githubusercontent.com/0xblackbot/rainbow-swap/refs/heads/main/public/external-assets/torch.png',
        dexTypes: [DexTypeEnum.Torch]
    },
    {
        id: DexGroupIdEnum.MoonCx,
        name: 'Moon.cx',
        image: 'https://raw.githubusercontent.com/0xblackbot/rainbow-swap/refs/heads/main/public/external-assets/mooncx.png',
        dexTypes: [DexTypeEnum.MoonCxCpmm, DexTypeEnum.MoonCxClmm]
    },
    {
        id: DexGroupIdEnum.Coffee,
        name: 'Coffee',
        image: 'https://raw.githubusercontent.com/0xblackbot/rainbow-swap/refs/heads/main/public/external-assets/coffee.png',
        dexTypes: [DexTypeEnum.Coffee, DexTypeEnum.CoffeeCurveFiV2]
    },
    {
        id: DexGroupIdEnum.Uranus,
        name: 'Uranus',
        image: 'https://raw.githubusercontent.com/0xblackbot/rainbow-swap/refs/heads/main/public/external-assets/uranus.png',
        dexTypes: [DexTypeEnum.Uranus]
    }
];
