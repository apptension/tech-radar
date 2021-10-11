import { produce } from 'immer';

import { GlobalState } from '../config/reducers';
import { STARTUP_INITIAL_STATE } from '../modules/startup';
import { USERS_INITIAL_STATE } from '../modules/users';
//<-- IMPORT MODULE STATE -->

export const store: GlobalState = {
  startup: STARTUP_INITIAL_STATE,
  users: USERS_INITIAL_STATE,
  //<-- INJECT MODULE STATE -->
};

export const prepareState = (stateSetter: (draftState: GlobalState) => void) => produce(store, stateSetter);
