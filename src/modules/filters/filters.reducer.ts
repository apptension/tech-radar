import { createReducer, PayloadAction } from '@reduxjs/toolkit';

import { FiltersState, FilterType } from './filters.types';
import * as actions from './filters.actions';

export const INITIAL_STATE: FiltersState = {
  area: null,
  level: null,
  team: null,
  search: null,
};

const handleSetArea = (state: FiltersState, { payload }: PayloadAction<FilterType>) => {
  state.area = payload === state.area ? null : payload;
};

const handleSetLevel = (state: FiltersState, { payload }: PayloadAction<FilterType>) => {
  state.level = payload === state.level ? null : payload;
};

const handleSetTeam = (state: FiltersState, { payload }: PayloadAction<FilterType>) => {
  state.team = payload;
};

const handleSetSearch = (state: FiltersState, { payload }: PayloadAction<FilterType>) => {
  state.search = payload;
};

export const reducer = createReducer(INITIAL_STATE, (builder) => {
  builder.addCase(actions.setArea, handleSetArea);
  builder.addCase(actions.setLevel, handleSetLevel);
  builder.addCase(actions.setTeam, handleSetTeam);
  builder.addCase(actions.setSearch, handleSetSearch);
});
