import { createAction } from '@reduxjs/toolkit';
import { FilterType } from './filters.types';

export const setArea = createAction<FilterType>('SET_AREA');

export const setLevel = createAction<FilterType>('SET_LEVEL');

export const setTeam = createAction<FilterType>('SET_TEAM');

export const setSearch = createAction<FilterType>('SET_SEARCH');
