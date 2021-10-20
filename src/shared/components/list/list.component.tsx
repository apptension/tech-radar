import React from 'react';
import { sortBy, prop, toLower, compose } from 'ramda';

import { useSelector } from 'react-redux';
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
import { selectSearch } from '../../../modules/filters/filters.selectors';
import { ListWrapper, ListItem, EmptyResults } from './list.styles';

interface ListProps {
  technologies: RadarTechnology[];
  emptyResults: boolean;
}

export const List = ({ technologies, emptyResults }: ListProps) => {
  const searchText = useSelector(selectSearch);
  //TODO display team and level tags

  const sortedTechnologies = sortBy(compose(toLower, prop('label')), technologies);

  if (emptyResults) {
    return (
      <EmptyResults>
        We’re sorry, but we haven’t found any technology called “{searchText}”. Please try again and note that we don’t
        support searching by keyword, yet.
      </EmptyResults>
    );
  }

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
