import React, { useState, UIEvent } from 'react';
import { sortBy, prop, toLower, compose, isEmpty } from 'ramda';

import { useDispatch, useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import {
  getBlipDataById,
  hideBubble,
  highlightBlip,
  highlightLegend,
  showBubble,
  unhighlightBlip,
  toggleQuadrant,
} from '../../utils/radarUtils';
import { color } from '../../../theme';
import { RadarRing, RadarTechnology } from '../radar/radar.types';
import { selectSearch } from '../../../modules/filters/filters.selectors';
import { TagSize, TagVariant } from '../tag/tag.types';
import { TechnologyId } from '../../../modules/technologyPopup/technologyPopup.types';
import { openTechnologyPopup } from '../../../modules/technologyPopup/technologyPopup.actions';
import {
  ListWrapper,
  List,
  ListItem,
  EmptyResults,
  ListLabel,
  ListItemTags,
  Tag,
  ShadowTop,
  ShadowBottom,
} from './technologiesList.styles';
import messages from './technologiesList.messages';

interface TechnologiesListProps {
  technologies: RadarTechnology[];
  emptyResults: { search: boolean; filters: boolean };
  rings: RadarRing[];
  hasNoAreaSelected: boolean;
}

export const TechnologiesList = ({ technologies, emptyResults, rings, hasNoAreaSelected }: TechnologiesListProps) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const searchText = useSelector(selectSearch);
  const [scrollTopReached, setScrollTopReached] = useState(true);
  const [scrollBottomReached, setScrollBottomReached] = useState(false);
  const isTouchDevice = Boolean('ontouchstart' in window || navigator.maxTouchPoints);
  const dispatch = useDispatch();
  const handleOpenPopup = (technologyId: TechnologyId) => dispatch(openTechnologyPopup(technologyId));

  const sortedTechnologies = sortBy(compose(toLower, prop('label')), technologies);

  const handleScroll = (e: UIEvent<HTMLUListElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    const scrollBottom = scrollHeight - clientHeight;
    setScrollTopReached(scrollTop === 0);
    setScrollBottomReached(scrollTop >= scrollBottom);
  };

  const getBlipColor = (isTechnologyInactive: boolean, isAllAreasInactive: boolean) => {
    if (isAllAreasInactive) {
      return color.mineShaft;
    }

    return isTechnologyInactive ? color.mineShaft : color.silver;
  };

  const handleOpenTechnologyPopup = (technology: RadarTechnology) => {
    hideBubble();
    handleOpenPopup(technology.id);
    unhighlightBlip({
      id: technology.id?.toString() || '',
      ring: technology.ring,
      color: getBlipColor(technology.inactive, hasNoAreaSelected),
    });
    toggleQuadrant(technology.quadrant, false);
  };

  const handleShowTags = (technology: RadarTechnology) => {
    setHoveredItem(technology.id);
    toggleQuadrant(technology.quadrant, true);
    highlightBlip({ id: technology.id || '', ring: technology.ring });
    highlightLegend({ id: technology.id || '' });
    const blipData = getBlipDataById(technology.id || '');
    showBubble({ label: technology.label, ring: technology.ring, x: blipData.x, y: blipData.y });
  };

  const handleHideTags = (technology: RadarTechnology) => {
    setHoveredItem(null);
    toggleQuadrant(technology.quadrant, false);
    unhighlightBlip({
      id: technology.id?.toString() || '',
      ring: technology.ring,
      color: getBlipColor(technology.inactive, hasNoAreaSelected),
    });
    highlightLegend({ id: technology.id || '', mode: 'off' });
    hideBubble();
  };

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
      <List onScroll={handleScroll}>
        {sortedTechnologies.map((technology) => (
          <ListItem
            showTechnology={!technology.inactive}
            key={`list-item-${technology.id}`}
            onMouseEnter={() => {
              if (isTouchDevice) return;

              handleShowTags(technology);
            }}
            onMouseLeave={() => {
              handleHideTags(technology);
            }}
          >
            <ListLabel
              id={`list-item-${technology.id}`}
              showPointer={!!technology.description.length}
              onTouchStart={() => {
                if (technology.description) {
                  handleOpenTechnologyPopup(technology);
                } else {
                  handleShowTags(technology);
                }
              }}
              onClick={() => {
                if (technology.description) {
                  handleOpenTechnologyPopup(technology);
                } else {
                  handleShowTags(technology);
                }
              }}
            >
              {technology.label}
            </ListLabel>
            <ListItemTags visible={hoveredItem === technology.id} id={`list-item-tags-${technology.id}`}>
              <Tag size={TagSize.SMALL} variant={TagVariant.DARK}>
                {rings[technology.ring].name}
              </Tag>
              {!!technology.team && (
                <Tag size={TagSize.SMALL} variant={TagVariant.DARK}>
                  {technology.team}
                </Tag>
              )}
            </ListItemTags>
          </ListItem>
        ))}
      </List>
      <ShadowTop visible={!scrollTopReached} />
      <ShadowBottom visible={!scrollBottomReached} />
    </ListWrapper>
  );
};
