import { combineReducers } from 'redux';

import { reducer as startupReducer } from '../modules/startup/startup.reducer';
import { StartupState } from '../modules/startup/startup.types';
import { reducer as usersReducer } from '../modules/users/users.reducer';
import { UsersState } from '../modules/users/users.types';
//<-- IMPORT MODULE REDUCER -->

export type GlobalState = {
  startup: StartupState;
  users: UsersState;
  //<-- INJECT MODULE STATE TYPE -->
};

export default function createReducer() {
  return combineReducers({
    startup: startupReducer,
    users: usersReducer,
    //<-- INJECT MODULE REDUCER -->
  });
}
