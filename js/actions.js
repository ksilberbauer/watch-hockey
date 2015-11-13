import {
  START,
  STOP,
  CLEAR_PARAMS,
  DO_REFOCUS,
  INIT,
  PARAMS,
} from './constants';

export const start = (params, doRefocus) =>  ({ type: START, params, doRefocus, });

export const stop = () => ({ type: STOP });

export const clearParams = () => ({ type: CLEAR_PARAMS });

export const doRefocus = doRefocus => ({ type: DO_REFOCUS, doRefocus });

export const init = () => ({ type: INIT });