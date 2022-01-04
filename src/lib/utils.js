import { AmountFormatter } from '@aeternity/aepp-sdk';
import BigNumber from 'bignumber.js';

export const fetchJson = async (...args) => {
  const response = await fetch(...args);
  return response.json();
};

export const aettosToAe = (v) => AmountFormatter.formatAmount(v, {
  denomination: AmountFormatter.AE_AMOUNT_FORMATS.AETTOS,
  targetDenomination: AmountFormatter.AE_AMOUNT_FORMATS.AE,
});

export const cttoak = (value) => value.replace('ct_', 'ak_');
export const calculateSelectedToken = (token, from, to, isFrom) => {
  const result = [from, to, false];
  const getKey = (t) => t?.contract_id + (!!t?.is_ae);
  if (!token
    || (getKey(token) === getKey(from) && !isFrom)
    || (getKey(token) === getKey(to) && isFrom)) {
    result[1] = from;
    result[0] = to;
    result[2] = true;
    return result;
  }
  if (isFrom) {
    result[0] = token;
  } else {
    result[1] = token;
  }
  return result;
};

export const reduceDecimals = (val, token) => BigNumber(val)
  .div(BigNumber(10).pow(token.decimals));
export const expandDecimals = (val, token) => BigInt(BigNumber(10)
  .pow(token.decimals).times(val).toFixed());

export const handleUnknownError = (error) => console.warn('Unknown rejection', error);

export const isNotFoundError = (error) => error.statusCode === 404;
