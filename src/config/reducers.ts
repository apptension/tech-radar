import { combineReducers } from 'redux';
import { FiltersState } from '../modules/filters/filters.types';

import { reducer as startupReducer } from '../modules/startup/startup.reducer';
import { reducer as filtersReducer } from '../modules/filters/filters.reducer';
import { StartupState } from '../modules/startup/startup.types';
import { reducer as technologyPopupReducer } from '../modules/technologyPopup/technologyPopup.reducer';
import { TechnologyPopupState } from '../modules/technologyPopup/technologyPopup.types';
//<-- IMPORT MODULE REDUCER -->

export type GlobalState = {
  startup: StartupState;
  filters: FiltersState;
  technologyPopup: TechnologyPopupState;
  //<-- INJECT MODULE STATE TYPE -->
};

export default function createReducer() {
  return combineReducers({
    startup: startupReducer,
    filters: filtersReducer,
    technologyPopup: technologyPopupReducer,
    //<-- INJECT MODULE REDUCER -->
  });
}
