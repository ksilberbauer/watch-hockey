import {
  START,
  STOP,
  PARAMS,
} from './constants';

export const start = params =>  ({ type: START, params });

export const stop = () => ({ type: STOP });