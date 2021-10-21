import React, { useState } from 'react';
import { sortBy, prop, toLower, compose, isEmpty } from 'ramda';

import { useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import {
  getBlipDataById,
  hideBubble,
  highlightBlip,
  highlightLegend,
  showBubble,
  unhighlightBlip,
} from '../../utils/radarUtils';
import { color } from '../../../theme';
import { RadarRing, RadarTechnology } from '../radar/radar.types';
import { selectArea, selectSearch } from '../../../modules/filters/filters.selectors';
import { TagSize } from '../tag/tag.types';
import { ListWrapper, ListItem, EmptyResults, ListLabel, ListItemTags, Tag } from './technologiesList.styles';
import messages from './technologiesList.messages';

interface TechnologiesListProps {
  technologies: RadarTechnology[];
  emptyResults: { search: boolean; filters: boolean };
  rings: RadarRing[];
}

export const TechnologiesList = ({ technologies, emptyResults, rings }: TechnologiesListProps) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const searchText = useSelector(selectSearch);
  const areaValue = useSelector(selectArea);

  const activeTechnologies = areaValue ? technologies.filter((technology) => !technology.inactive) : technologies;
  const sortedTechnologies = sortBy(compose(toLower, prop('label')), activeTechnologies);

  if (emptyResults.search) {
    return (
      <EmptyResults>
        <FormattedMessage {...messages.emptySearch} values={{ searchText }} />
      </EmptyResults>
    );
  }

  if (emptyResults.filters || isEmpty(sortedTechnologies)) {
    return (
      <EmptyResults>
        <FormattedMessage {...messages.emptyFiltering} />
      </EmptyResults>
    );
  }

  return (
    <ListWrapper>
      {sortedTechnologies.map((technology) => (
        <ListItem
          key={`list-item-${technology.id}`}
          onMouseEnter={() => {
            setHoveredItem(technology.id);
            highlightBlip({ id: technology.id || '', ring: technology.ring });
            highlightLegend({ id: technology.id || '' });
            const blipData = getBlipDataById(technology.id || '');
            showBubble({ label: technology.label, ring: technology.ring, x: blipData.x, y: blipData.y });
          }}
          onMouseLeave={() => {
            setHoveredItem(null);
            unhighlightBlip({
              id: technology.id?.toString() || '',
              ring: technology.ring,
              color: technology.inactive ? color.mineShaft : color.silver,
            });
            highlightLegend({ id: technology.id || '', mode: 'off' });
            hideBubble();
          }}
        >
          <ListLabel id={`list-item-${technology.id}`}>{technology.label}</ListLabel>
          <ListItemTags visible={hoveredItem === technology.id} id={`list-item-tags-${technology.id}`}>
            <Tag size={TagSize.SMALL}>{rings[technology.ring].name}</Tag>
            {!!technology.team && <Tag size={TagSize.SMALL}>{technology.team}</Tag>}
          </ListItemTags>
        </ListItem>
      ))}
    </ListWrapper>
  );
};
