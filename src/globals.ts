import {toNano} from '@ton/core';
import {TonClient} from '@ton/ton';
import axios from 'axios';

export const TON = 'ton';
export const WORKCHAIN = 0;

export const API = axios.create({
    baseURL: 'https://api.blackbot.technology/rainbow/api'
});

export const TON_CLIENT = new TonClient({
    endpoint: `https://api.blackbot.technology/ton-http-api/jsonRPC`
});

export const GAS_AMOUNT = toNano('0.255');
export const JETTON_TRANSFER_GAS_AMOUNT = toNano('0.065');
