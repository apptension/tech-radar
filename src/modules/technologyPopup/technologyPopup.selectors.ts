import { createSelector } from '@reduxjs/toolkit';
import { GlobalState } from '../../config/reducers';

export const selectTechnologyPopupDomain = (state: GlobalState) => state.technologyPopup;

export const selectTechnologyPopupOpen = createSelector(selectTechnologyPopupDomain, (state) => state.open);
export const selectTechnologyId = createSelector(selectTechnologyPopupDomain, (state) => state.technologyId);
