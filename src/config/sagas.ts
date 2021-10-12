import { all, fork } from 'redux-saga/effects';

import { watchStartup } from '../modules/startup/startup.sagas';
//<-- IMPORT MODULE SAGA -->

export default function* rootSaga() {
  yield all([
    fork(watchStartup),
    //<-- INJECT MODULE SAGA -->
  ]);
}
