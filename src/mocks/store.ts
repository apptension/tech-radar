import { produce } from 'immer';

import { GlobalState } from '../config/reducers';
import { STARTUP_INITIAL_STATE } from '../modules/startup';
import { FILTERS_INITIAL_STATE } from '../modules/filters';
import { TECHNOLOGY_POPUP_INITIAL_STATE } from '../modules/technologyPopup';
//<-- IMPORT MODULE STATE -->

export const store: GlobalState = {
  startup: STARTUP_INITIAL_STATE,
  filters: FILTERS_INITIAL_STATE,
  technologyPopup: TECHNOLOGY_POPUP_INITIAL_STATE,
  //<-- INJECT MODULE STATE -->
};

export const prepareState = (stateSetter: (draftState: GlobalState) => void) => produce(store, stateSetter);
