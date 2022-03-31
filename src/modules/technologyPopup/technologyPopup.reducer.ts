import { createReducer, PayloadAction } from '@reduxjs/toolkit';

import * as technologyPopupActions from './technologyPopup.actions';
import { TechnologyId, TechnologyPopupState } from './technologyPopup.types';

export const INITIAL_STATE: TechnologyPopupState = {
  open: false,
  technologyId: '',
};

const handleOpenTechnology = (state: TechnologyPopupState, { payload }: PayloadAction<TechnologyId>) => {
  state.open = true;
  state.technologyId = payload;
};

const handleCloseTechnology = (state: TechnologyPopupState) => {
  state.open = false;
  state.technologyId = '';
};

export const reducer = createReducer(INITIAL_STATE, (builder) => {
  builder.addCase(technologyPopupActions.openTechnologyPopup, handleOpenTechnology);
  builder.addCase(technologyPopupActions.closeTechnologyPopup, handleCloseTechnology);
});
