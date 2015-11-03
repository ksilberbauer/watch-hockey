import {
  START,
  STOP,
  CLEAR_PARAMS,
  DO_REFOCUS,
  GET_STATE,
  PARAMS,
} from './constants';

export const start = (params, doRefocus) =>  ({ type: START, params, doRefocus, });

export const stop = () => ({ type: STOP });

export const clearParams = () => ({ type: CLEAR_PARAMS });

export const doRefocus = doRefocus => ({ type: DO_REFOCUS, doRefocus });

export const getState = () => ({ type: GET_STATE });