import React from 'react';
import { sortBy, prop } from 'ramda';

import { highlightBlip, highlightLegend, unhighlightBlip } from '../../utils/radarUtils';
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
            // TODO show bubble
            highlightBlip({ id: technology.id || '', ring: technology.ring });
            highlightLegend({ id: technology.id || '' });
          }}
          onMouseLeave={() => {
            // TODO hide bubble
            unhighlightBlip({
              id: technology.id?.toString() || '',
              ring: technology.ring,
              color: technology.inactive ? color.mineShaft : color.silver,
            });
            highlightLegend({ id: technology.id || '', mode: 'off' });
          }}
        >
          {technology.label}
        </ListItem>
      ))}
    </ListWrapper>
  );
};
