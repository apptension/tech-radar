import React, { useEffect, useState } from 'react';
import { isEmpty } from 'ramda';
import { useDispatch, useSelector } from 'react-redux';
import { useDebounce } from 'use-debounce';
import { FormattedMessage, useIntl } from 'react-intl';

import { Radar } from '../../shared/components/radar';
import { useContentfulData } from '../../shared/hooks/useContentfulData/useContentfulData';
import { TitleTagSize } from '../../shared/components/titleTag/titleTag.types';
import { QUADRANT } from '../../shared/components/radar/radar.constants';
import { getUpdatedRadarTechnologies, getRotatedData, pluckNameFromList } from '../../shared/utils/radarUtils';
import { RadarQuadrant, RadarTechnology } from '../../shared/components/radar/radar.types';
import { Sidebar } from '../../shared/components/sidebar';
import { selectArea, selectLevel, selectSearch, selectTeam } from '../../modules/filters/filters.selectors';
import { INITIAL_ACTIVE_QUADRANT } from '../app.constants';
import { setArea } from '../../modules/filters/filters.actions';
import { useMediaQuery } from '../../shared/hooks/useMediaQuery';
import { Breakpoint } from '../../theme/media';
import { renderWhenTrue } from '../../shared/utils/rendering';
import {
  Container,
  TitleTag,
  Viewer,
  SidebarWrapper,
  Toolbar,
  ZoomControls,
  Loading,
  Loader,
  LOADING_ANIMATION_MS,
  Error,
} from './explore.styles';
import { EMPTY_RESULTS_DEBOUNCE_TIME } from './explore.constants';
import messages from './explore.messages';

export const Explore = () => {
  const { matches: isDesktop } = useMediaQuery({ above: Breakpoint.DESKTOP });
  const intl = useIntl();

  const dispatch = useDispatch();
  const searchText = useSelector(selectSearch);
  const areaValue = useSelector(selectArea);
  const levelValue = useSelector(selectLevel);
  const teamValue = useSelector(selectTeam);

  const [filteredTechnologies, setFilteredTechnologies] = useState<RadarTechnology[]>([]);
  const [activeTechnologiesIds, setActiveTechnologiesIds] = useState<string[]>([]);

  const [activeQuadrant, setActiveQuadrant] = useState<number | null>(null);
  const [previouslyActiveQuadrant, setPreviouslyActiveQuadrant] = useState<number | null>(null);
  const [loadingVisible, setLoadingVisible] = useState(true);
  const [displayLoading, setDisplayLoading] = useState(true);
  const [displayError, setDisplayError] = useState(false);

  const [zoomedQuadrant, setZoomedQuadrant] = useState<number | null>(null);
  const [zoomedTechnologies, setZoomedTechnologies] = useState<RadarTechnology[]>([]);
  const [zoomedQuadrants, setZoomedQuadrants] = useState<RadarQuadrant[]>([]);

  const {
    contentfulQuery: { isSuccess, isError },
    radarTechnologies,
    radarQuadrants,
    radarRings,
    radarTeams,
  } = useContentfulData();

  useEffect(() => {
    if (!isEmpty(radarQuadrants) && !areaValue) {
      dispatch(setArea(radarQuadrants[INITIAL_ACTIVE_QUADRANT].name));
    }

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
        setPreviouslyActiveQuadrant(activeQuadrant);
        setActiveQuadrant(quadrantForArea ? quadrantForArea.position : null);
      }
    }
  }, [areaValue, radarQuadrants]);

  useEffect(() => {
    if (zoomedQuadrant) {
      rotateData(QUADRANT.topLeft);
    }
    updateFilteredTechnologies();
  }, [searchText, levelValue, teamValue, activeQuadrant]);

  useEffect(() => {
    setPreviouslyActiveQuadrant(activeQuadrant);
  }, [searchText, levelValue, teamValue]);

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

  const rotateData = (newQuadrant: number) => {
    const { movedTechnologies, movedQuadrants } = getRotatedData({
      activeQuadrant,
      quadrants: radarQuadrants,
      technologies: radarTechnologies,
      newQuadrant,
      searchText,
      levelValue,
      teamValue,
      rings: radarRings,
    });
    setZoomedTechnologies(movedTechnologies);
    setZoomedQuadrants(movedQuadrants);
  };

  const activeRing = () => {
    if (levelValue) {
      const foundActiveRing = radarRings.find((ring) => ring.name === levelValue);
      return foundActiveRing ? foundActiveRing.position : null;
    }
    return null;
  };

  const onZoomIn = () => {
    setZoomedQuadrant(QUADRANT.topLeft);
    rotateData(QUADRANT.topLeft);
  };

  const onZoomOut = () => setZoomedQuadrant(null);

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
      technologies={zoomedQuadrant ? zoomedTechnologies : filteredTechnologies}
      quadrants={zoomedQuadrant ? zoomedQuadrants : radarQuadrants}
      rings={radarRings}
      activeQuadrant={activeQuadrant}
      previouslyActiveQuadrant={previouslyActiveQuadrant}
      zoomedQuadrant={zoomedQuadrant}
      activeRing={activeRing()}
    />
  ));

  const renderViewerControls = renderWhenTrue(() => (
    <>
      <Toolbar
        areaOptions={pluckNameFromList(radarQuadrants)}
        levelOptions={pluckNameFromList(radarRings)}
        teamOptions={pluckNameFromList(radarTeams)}
      />
      <ZoomControls
        onZoomIn={onZoomIn}
        onZoomOut={onZoomOut}
        zoomInDisabled={!!zoomedQuadrant}
        zoomOutDisabled={!zoomedQuadrant}
      />
    </>
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
            activeQuadrant={activeQuadrant}
          />
        </SidebarWrapper>
        <Viewer>
          {renderRadar(isDesktop)}
          {isSuccess && renderViewerControls(isDesktop)}
        </Viewer>
      </>
    );

  const renderLoading = () => (
    <Loading visible={loadingVisible} shouldDisplay={displayLoading}>
      <Loader text={intl.formatMessage(messages.loading)} withEllipsis />
    </Loading>
  );

  return (
    <Container>
      <TitleTag size={TitleTagSize.SMALL} withLogo />
      {renderContent()}
      {renderLoading()}
    </Container>
  );
};
