import { combineReducers } from 'redux';

import { reducer as startupReducer } from '../modules/startup/startup.reducer';
import { StartupState } from '../modules/startup/startup.types';
//<-- IMPORT MODULE REDUCER -->

export type GlobalState = {
  startup: StartupState;
  //<-- INJECT MODULE STATE TYPE -->
};

export default function createReducer() {
  return combineReducers({
    startup: startupReducer,
    //<-- INJECT MODULE REDUCER -->
  });
}
