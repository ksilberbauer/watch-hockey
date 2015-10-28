import {
  START,
  STOP,
  CLEAR_PARAMS,
  PARAMS,
} from './constants';

export const start = params =>  ({ type: START, params });

export const stop = () => ({ type: STOP });

export const clearParams = () => ({ type: CLEAR_PARAMS });