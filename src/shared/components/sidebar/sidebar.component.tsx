import { useDispatch, useSelector } from 'react-redux';
import { useIntl } from 'react-intl';
import { GetInTouch } from '../getInTouch';
import { selectArea, selectSearch } from '../../../modules/filters/filters.selectors';
import { setSearch } from '../../../modules/filters/filters.actions';
import { renderWhenTrueOtherwise } from '../../utils/rendering';
import { RadarQuadrant, RadarRing, RadarTeam, RadarTechnology } from '../radar/radar.types';
import messages from '../input/input.messages';
import { Input } from '../input';
import { TechnologiesList } from '../technologiesList';
import { pluckNameFromList } from '../../utils/radarUtils';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { useContentfulData } from '../../hooks/useContentfulData/useContentfulData';
import { Breakpoint } from '../../../theme/media';
import { TechnologyPopup } from '../technologyPopup';
import { selectTechnologyPopupOpen } from '../../../modules/technologyPopup/technologyPopup.selectors';
import { Toolbar } from '../toolbar';
import { Container } from './sidebar.styles';

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
  const searchText = useSelector(selectSearch);
  const hasNoAreaSelected = !areaValue;
  const { radarQuadrants } = useContentfulData();

  const renderTechnologyPopup = () => <TechnologyPopup technologies={technologies} />;
  const renderFilteringList = () => (
    <>
      <Input
        withSearchIcon
        placeholder={intl.formatMessage(messages.placeholder)}
        onChange={(text) => dispatch(setSearch(text))}
        defaultValue={searchText || ''}
      />
      <Toolbar
        quadrants={radarQuadrants}
        areaOptions={pluckNameFromList(quadrants)}
        levelOptions={pluckNameFromList(rings)}
        teamOptions={pluckNameFromList(teams)}
      />
      <TechnologiesList
        technologies={technologies}
        emptyResults={emptyResults}
        rings={rings}
        teams={teams}
        hasNoAreaSelected={hasNoAreaSelected}
      />
      {isDesktop && <GetInTouch asPopup />}
    </>
  );

  const renderContent = renderWhenTrueOtherwise(renderTechnologyPopup, renderFilteringList);

  return <Container noPadding={technologyPopupOpen}>{renderContent(technologyPopupOpen)}</Container>;
};
