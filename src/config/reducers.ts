import { combineReducers } from 'redux';
import { FiltersState } from '../modules/filters/filters.types';

import { reducer as startupReducer } from '../modules/startup/startup.reducer';
import { reducer as filtersReducer } from '../modules/filters/filters.reducer';
import { StartupState } from '../modules/startup/startup.types';
//<-- IMPORT MODULE REDUCER -->

export type GlobalState = {
  startup: StartupState;
  filters: FiltersState;
  //<-- INJECT MODULE STATE TYPE -->
};

export default function createReducer() {
  return combineReducers({
    startup: startupReducer,
    filters: filtersReducer,
    //<-- INJECT MODULE REDUCER -->
  });
}
