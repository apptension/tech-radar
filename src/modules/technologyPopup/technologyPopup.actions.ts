import { createAction } from '@reduxjs/toolkit';
import { TechnologyId } from './technologyPopup.types';

const PREFIX = 'TECHNOLOGY_POPUP';

export const openTechnologyPopup = createAction<TechnologyId>(`${PREFIX}_OPEN`);

export const closeTechnologyPopup = createAction(`${PREFIX}_CLOSE`);
