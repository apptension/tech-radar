import React from 'react';
import { sortBy, prop } from 'ramda';

import {
  getBlipDataById,
  hideBubble,
  highlightBlip,
  highlightLegend,
  showBubble,
  unhighlightBlip,
} from '../../utils/radarUtils';
import { color } from '../../../theme';
import { RadarTechnology } from '../radar/radar.types';
import { ListWrapper, ListItem } from './list.styles';

interface ListProps {
  technologies: RadarTechnology[];
}

export const List = ({ technologies }: ListProps) => {
  const sortedTechnologies = sortBy(prop('label'), technologies);

  return (
    <ListWrapper>
      {sortedTechnologies.map((technology) => (
        <ListItem
          key={`list-item-${technology.id}`}
          id={`list-item-${technology.id}`}
          onMouseEnter={() => {
            highlightBlip({ id: technology.id || '', ring: technology.ring });
            highlightLegend({ id: technology.id || '' });
            const blipData = getBlipDataById(technology.id || '');
            showBubble({ label: technology.label, ring: technology.ring, x: blipData.x, y: blipData.y });
          }}
          onMouseLeave={() => {
            unhighlightBlip({
              id: technology.id?.toString() || '',
              ring: technology.ring,
              color: technology.inactive ? color.mineShaft : color.silver,
            });
            highlightLegend({ id: technology.id || '', mode: 'off' });
            hideBubble();
          }}
        >
          {technology.label}
        </ListItem>
      ))}
    </ListWrapper>
  );
};
