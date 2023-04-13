import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useIntl } from 'react-intl';
import { GetInTouch } from '../getInTouch';
import { selectArea, selectLevel, selectSearch, selectTeam } from '../../../modules/filters/filters.selectors';
import { setArea, setLevel, setSearch, setTeam } from '../../../modules/filters/filters.actions';
import { renderWhenTrue, renderWhenTrueOtherwise } from '../../utils/rendering';
import { RadarQuadrant, RadarRing, RadarTeam, RadarTechnology } from '../radar/radar.types';
import { TagSize } from '../tag/tag.types';
import messages from '../input/input.messages';
import { Input } from '../input';
import { TechnologiesList } from '../technologiesList';
import { pluckNameFromList } from '../../utils/radarUtils';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { Breakpoint } from '../../../theme/media';
import { TechnologyPopup } from '../technologyPopup';
import { selectTechnologyPopupOpen } from '../../../modules/technologyPopup/technologyPopup.selectors';
import { Container, FiltersContainer, Tag, Toolbar } from './sidebar.styles';

interface SidebarProps {
  technologies: RadarTechnology[];
  emptyResults: { search: boolean; filters: boolean };
  rings: RadarRing[];
  teams: RadarTeam[];
  quadrants: RadarQuadrant[];
}

export const Sidebar = ({ technologies, emptyResults, rings, teams, quadrants }: SidebarProps) => {
  const { matches: isDesktop } = useMediaQuery({ above: Breakpoint.DESKTOP });
  const intl = useIntl();
  const dispatch = useDispatch();
  const technologyPopupOpen = useSelector(selectTechnologyPopupOpen);
  const areaValue = useSelector(selectArea);
  const levelValue = useSelector(selectLevel);
  const teamValue = useSelector(selectTeam);
  const searchText = useSelector(selectSearch);
  const hasNoAreaSelected = !areaValue;

  const removeArea = () => dispatch(setArea(null));
  const removeLevel = () => dispatch(setLevel(null));
  const removeTeam = () => dispatch(setTeam(null));

  const renderAreaFilterTag = renderWhenTrue(() => (
    <Tag size={TagSize.SMALL} onRemove={removeArea}>
      {areaValue}
    </Tag>
  ));

  const renderLevelFilterTag = renderWhenTrue(() => (
    <Tag size={TagSize.SMALL} onRemove={removeLevel}>
      {levelValue}
    </Tag>
  ));

  const renderTeamFilterTag = renderWhenTrue(() => (
    <Tag size={TagSize.SMALL} onRemove={removeTeam}>
      {teamValue}
    </Tag>
  ));

  const renderToolbar = renderWhenTrue(() => (
    <Toolbar
      areaOptions={pluckNameFromList(quadrants)}
      levelOptions={pluckNameFromList(rings)}
      teamOptions={pluckNameFromList(teams)}
    />
  ));

  const renderTechnologyPopup = () => <TechnologyPopup technologies={technologies} />;
  const renderFilteringList = () => (
    <>
      <Input
        withSearchIcon
        placeholder={intl.formatMessage(messages.placeholder)}
        onChange={(text) => dispatch(setSearch(text))}
        defaultValue={searchText || ''}
      />
      <FiltersContainer>
        {renderAreaFilterTag(!!areaValue)}
        {renderLevelFilterTag(!!levelValue)}
        {renderTeamFilterTag(!!teamValue)}
      </FiltersContainer>
      <TechnologiesList
        technologies={technologies}
        emptyResults={emptyResults}
        rings={rings}
        teams={teams}
        hasNoAreaSelected={hasNoAreaSelected}
      />
      {isDesktop && <GetInTouch asPopup />}
      {renderToolbar(!isDesktop)}
    </>
  );

  const renderContent = renderWhenTrueOtherwise(renderTechnologyPopup, renderFilteringList);

  return <Container noPadding={technologyPopupOpen}>{renderContent(technologyPopupOpen)}</Container>;
};
