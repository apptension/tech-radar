import { createSelector } from '@reduxjs/toolkit';

import { GlobalState } from '../../config/reducers';

export const selectFiltersDomain = (state: GlobalState) => state.filters;

export const selectArea = createSelector(selectFiltersDomain, (state) => state.area);

export const selectLevel = createSelector(selectFiltersDomain, (state) => state.level);

export const selectTeam = createSelector(selectFiltersDomain, (state) => state.team);
