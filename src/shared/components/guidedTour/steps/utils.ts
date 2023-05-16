import { color } from '../../../../theme';
import { highlightBlip, unhighlightBlip } from '../../../utils/radarUtils';
import { RadarTechnology } from './../../radar/radar.types';

export const highlightBlips = (list: RadarTechnology[]) => {
  list.forEach((tech) => {
    highlightBlip({ id: tech?.id || '', ring: Number(tech?.ring), scale: false });
  });
};

export const unHighlightBlips = (list: RadarTechnology[]) => {
  list.forEach((tech) => {
    unhighlightBlip({
      id: tech?.id || '',
      ring: Number(tech?.ring),
      color: color.mineShaft,
    });
  });
};
