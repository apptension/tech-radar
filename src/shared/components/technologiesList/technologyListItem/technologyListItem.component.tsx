import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { TechnologyId } from '../../../../modules/technologyPopup/technologyPopup.types';
import { color } from '../../../../theme';
import {
  getBlipDataById,
  hideBubble,
  highlightBlip,
  highlightLegend,
  showBubble,
  toggleQuadrant,
  unhighlightBlip,
} from '../../../utils/radarUtils';
import { RadarTechnology } from '../../radar/radar.types';
import { TagSize, TagVariant } from '../../tag/tag.types';
import { ListItemTags, ListItem, ListLabel, Tag } from './technologyListItem.styles';
import messages from './technologiesListItem.messages';
interface TechnologyListItemProps {
  technology: RadarTechnology;
  ringName: string;
  hasNoAreaSelected: boolean;
  handleOpenPopup: (technologyId: TechnologyId) => void;
}

export const getTeamLabel = (teams: string[]) =>
  teams.length > 4 ? (
    <FormattedMessage {...messages.allTeams} />
  ) : teams.length > 1 ? (
    <FormattedMessage {...messages.multipleTeams} values={{ amount: teams.length }} />
  ) : (
    teams[0]
  );

export const TechnologyListItem = ({
  technology,
  ringName,
  hasNoAreaSelected,
  handleOpenPopup,
}: TechnologyListItemProps) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const isTouchDevice = Boolean('ontouchstart' in window || navigator.maxTouchPoints);

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

  const handleLabelClick = () =>
    technology.description ? handleOpenTechnologyPopup(technology) : handleShowTags(technology);

  return (
    <ListItem
      showTechnology={!technology.inactive}
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
        onTouchStart={handleLabelClick}
        onClick={handleLabelClick}
      >
        {technology.label}
      </ListLabel>
      <ListItemTags visible={hoveredItem === technology.id} id={`list-item-tags-${technology.id}`}>
        <Tag size={TagSize.SMALL} variant={TagVariant.DARK}>
          {ringName}
        </Tag>
        {!!technology.teams.length && (
          <Tag size={TagSize.SMALL} variant={TagVariant.DARK}>
            {getTeamLabel(technology.teams)}
          </Tag>
        )}
      </ListItemTags>
    </ListItem>
  );
};
