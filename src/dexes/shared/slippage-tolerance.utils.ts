const PRECISION = 10 ** 6;

export const applySlippageTolerance = (
    amount: string,
    slippageTolerance: number
) => {
    const amountBigInt = BigInt(amount);

    const slippageAmount =
        (amountBigInt * BigInt(Math.ceil(slippageTolerance * PRECISION))) /
        BigInt(100 * PRECISION);

    return amountBigInt - slippageAmount;
};
