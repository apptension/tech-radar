import { useEffect, useRef, useState } from 'react';
import { isEmpty } from 'ramda';
import { useSelector } from 'react-redux';
import { useDebounce } from 'use-debounce';
import { FormattedMessage } from 'react-intl';

import { Radar } from '../../shared/components/radar';
import { useContentfulData, useLastContentfulUpdate } from '../../shared/hooks/useContentfulData/useContentfulData';
import { TitleTagSize } from '../../shared/components/titleTag/titleTag.types';
import { getUpdatedRadarTechnologies } from '../../shared/utils/radarUtils';
import { RadarTechnology } from '../../shared/components/radar/radar.types';
import { Sidebar } from '../../shared/components/sidebar';
import { selectArea, selectLevel, selectSearch, selectTeam } from '../../modules/filters/filters.selectors';
import { useMediaQuery } from '../../shared/hooks/useMediaQuery';
import { Breakpoint } from '../../theme/media';
import { ButtonIcon, ButtonVariant } from '../../shared/components/button/button.types';
import { renderWhenTrue } from '../../shared/utils/rendering';
import {
  Container,
  TitleTag,
  Viewer,
  SidebarWrapper,
  Loading,
  Loader,
  LOADING_ANIMATION_MS,
  Error,
  Tooltip,
  TooltipArrow,
  TooltipContent,
  StyledLastUpdate,
  GetInTouchButton,
} from './explore.styles';
import { EMPTY_RESULTS_DEBOUNCE_TIME } from './explore.constants';
import messages from './explore.messages';

export const Explore = () => {
  const lastContentfulUpdate = useLastContentfulUpdate();
  const { matches: isMobile } = useMediaQuery({ below: Breakpoint.MOBILE });
  const { matches: isDesktop } = useMediaQuery({ above: Breakpoint.DESKTOP });
  const viewerRef = useRef<HTMLDivElement>(null);

  const searchText = useSelector(selectSearch);
  const areaValue = useSelector(selectArea);
  const levelValue = useSelector(selectLevel);
  const teamValue = useSelector(selectTeam);

  const [filteredTechnologies, setFilteredTechnologies] = useState<RadarTechnology[]>([]);
  const [activeTechnologiesIds, setActiveTechnologiesIds] = useState<string[]>([]);

  const [activeQuadrant, setActiveQuadrant] = useState<number | null>(null);
  const [loadingVisible, setLoadingVisible] = useState(true);
  const [displayLoading, setDisplayLoading] = useState(true);
  const [displayError, setDisplayError] = useState(false);

  const {
    contentfulQuery: { isSuccess, isError, isFetched },
    radarTechnologies,
    radarQuadrants,
    radarRings,
    radarTeams,
  } = useContentfulData();

  useEffect(() => {
    updateFilteredTechnologies();
    if (isSuccess) {
      setTimeout(() => {
        setLoadingVisible(false);
      }, LOADING_ANIMATION_MS);
      setTimeout(() => {
        setDisplayLoading(false);
      }, LOADING_ANIMATION_MS * 2);
    }

    if (isError) {
      setDisplayError(true);
    }
  }, [isSuccess, isError]);

  useEffect(() => {
    if (!isEmpty(radarQuadrants)) {
      const quadrantForArea = radarQuadrants.find((quadrant) => quadrant.name === areaValue);
      if (quadrantForArea?.position !== activeQuadrant && activeQuadrant !== areaValue) {
        setActiveQuadrant(quadrantForArea ? quadrantForArea.position : null);
      }
    }
  }, [areaValue, radarQuadrants]);

  useEffect(() => {
    updateFilteredTechnologies();
  }, [searchText, levelValue, teamValue, activeQuadrant]);

  const updateFilteredTechnologies = () => {
    if (!isEmpty(radarTechnologies)) {
      const { updatedTechnologies, activeIds } = getUpdatedRadarTechnologies({
        searchText,
        technologies: radarTechnologies,
        rings: radarRings,
        teamValue,
        levelValue,
        activeQuadrant,
      });
      setFilteredTechnologies(updatedTechnologies);
      setActiveTechnologiesIds(activeIds);
    }
  };

  const activeRing = () => {
    if (levelValue) {
      const foundActiveRing = radarRings.find((ring) => ring.name === levelValue);
      return foundActiveRing ? foundActiveRing.position : null;
    }
    return null;
  };

  const [emptyResultsFromSearch] = useDebounce(
    !!searchText && isEmpty(activeTechnologiesIds),
    EMPTY_RESULTS_DEBOUNCE_TIME
  );
  const [emptyResultsFromFiltering] = useDebounce(
    (!!levelValue || !!teamValue || !!areaValue) && isEmpty(activeTechnologiesIds),
    EMPTY_RESULTS_DEBOUNCE_TIME
  );

  const renderRadar = renderWhenTrue(() => (
    <Radar
      technologies={filteredTechnologies}
      quadrants={radarQuadrants}
      rings={radarRings}
      activeQuadrant={activeQuadrant}
      hasFilters={!!(areaValue || teamValue || levelValue || searchText)}
      activeRing={activeRing()}
      viewerHeight={viewerRef.current?.offsetHeight || 0}
      viewerWidth={viewerRef.current?.offsetWidth || 0}
    />
  ));

  const renderError = () => (
    <Error shouldDisplay={displayError}>
      <FormattedMessage {...messages.error} />
    </Error>
  );

  const renderContent = () =>
    displayError ? (
      renderError()
    ) : (
      <>
        <SidebarWrapper>
          <Sidebar
            technologies={filteredTechnologies}
            emptyResults={{ search: emptyResultsFromSearch, filters: emptyResultsFromFiltering }}
            rings={radarRings}
            teams={radarTeams}
            quadrants={radarQuadrants}
          />
        </SidebarWrapper>
        <Viewer ref={viewerRef}>
          {renderRadar(isDesktop && isFetched && !!filteredTechnologies.length && !!viewerRef.current)}
        </Viewer>
      </>
    );

  const renderLoading = () => (
    <Loading visible={loadingVisible} shouldDisplay={displayLoading}>
      <Loader />
    </Loading>
  );

  return (
    <Container>
      <TitleTag size={TitleTagSize.SMALL} withLogo withCompanyText />
      {isMobile ? (
        <GetInTouchButton variant={ButtonVariant.PRIMARY} icon={ButtonIcon.GET_IN_TOUCH} />
      ) : isDesktop ? null : (
        <GetInTouchButton variant={ButtonVariant.PRIMARY} icon={ButtonIcon.GET_IN_TOUCH}>
          <FormattedMessage {...messages.getInTouch} />
        </GetInTouchButton>
      )}

      {renderContent()}
      {renderLoading()}
      <Tooltip className="tooltip-container">
        <TooltipContent />
        <TooltipArrow className="tooltip-arrow" />
      </Tooltip>
      {!!lastContentfulUpdate && <StyledLastUpdate date={lastContentfulUpdate} />}
    </Container>
  );
};
