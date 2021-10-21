import React, { useEffect, useState } from 'react';
import { isEmpty } from 'ramda';
import { useDispatch, useSelector } from 'react-redux';
import { useDebounce } from 'use-debounce';
import { useIntl } from 'react-intl';

import { area } from 'd3';
import { Radar } from '../../shared/components/radar';
import { useContentfulData } from '../../shared/hooks/useContentfulData/useContentfulData';
import { TitleTagSize } from '../../shared/components/titleTag/titleTag.types';
import { QUADRANT } from '../../shared/components/radar/radar.constants';
import {
  getFilteredTechnologies,
  getRadarQuadrants,
  getRadarRings,
  getRadarTeams,
  getRadarTechnologies,
  getRotatedData,
  pluckNameFromList,
} from '../../shared/utils/radarUtils';
import { RadarQuadrant, RadarTechnology } from '../../shared/components/radar/radar.types';
import { Sidebar } from '../../shared/components/sidebar';
import { selectArea, selectLevel, selectSearch, selectTeam } from '../../modules/filters/filters.selectors';
import { INITIAL_ACTIVE_QUADRANT } from '../app.constants';
import { setArea } from '../../modules/filters/filters.actions';
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
} from './explore.styles';
import { EMPTY_RESULTS_DEBOUNCE_TIME } from './explore.constants';
import messages from './explore.messages';

export const Explore = () => {
  const intl = useIntl();

  const dispatch = useDispatch();
  const searchText = useSelector(selectSearch);
  const areaValue = useSelector(selectArea);
  const levelValue = useSelector(selectLevel);
  const teamValue = useSelector(selectTeam);

  const [filteredTechnologies, setFilteredTechnologies] = useState<RadarTechnology[]>([]);

  const [activeQuadrant, setActiveQuadrant] = useState<number | null>(null);
  const [loadingVisible, setLoadingVisible] = useState(true);
  const [displayLoading, setDisplayLoading] = useState(true);

  const [zoomedQuadrant, setZoomedQuadrant] = useState<number | null>(null);
  const [zoomedTechnologies, setZoomedTechnologies] = useState<RadarTechnology[]>([]);
  const [zoomedQuadrants, setZoomedQuadrants] = useState<RadarQuadrant[]>([]);

  const {
    contentfulQuery: { isSuccess },
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
  }, [isSuccess]);

  useEffect(() => {
    if (!isEmpty(radarQuadrants)) {
      const quadrantForArea = radarQuadrants.find((quadrant) => quadrant.name === areaValue);
      if (quadrantForArea?.position !== activeQuadrant && activeQuadrant !== areaValue) {
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

  const updateFilteredTechnologies = () => {
    if (!isEmpty(radarTechnologies)) {
      const filtered = getFilteredTechnologies({
        searchText,
        technologies: radarTechnologies,
        rings: radarRings,
        teamValue,
        levelValue,
        activeQuadrant,
      });
      setFilteredTechnologies(filtered);
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

  const onZoomIn = () => {
    setZoomedQuadrant(QUADRANT.topLeft);
    rotateData(QUADRANT.topLeft);
  };

  const onZoomOut = () => setZoomedQuadrant(null);

  const [emptyResultsFromSearch] = useDebounce(
    !!searchText && isEmpty(filteredTechnologies),
    EMPTY_RESULTS_DEBOUNCE_TIME
  );
  const [emptyResultsFromFiltering] = useDebounce(
    (!!levelValue || !!teamValue) && isEmpty(filteredTechnologies),
    EMPTY_RESULTS_DEBOUNCE_TIME
  );

  const currentTechnologies = () => {
    if (zoomedQuadrant) return zoomedTechnologies;
    return filteredTechnologies.length || emptyResultsFromFiltering ? filteredTechnologies : radarTechnologies;
  };

  const renderContent = () => (
    <>
      <SidebarWrapper>
        <Sidebar
          technologies={filteredTechnologies.length ? filteredTechnologies : radarTechnologies}
          emptyResults={{ search: emptyResultsFromSearch, filters: emptyResultsFromFiltering }}
          rings={radarRings}
        />
      </SidebarWrapper>
      <Viewer fullRadar={!zoomedQuadrant}>
        <Radar
          technologies={currentTechnologies()}
          quadrants={zoomedQuadrant ? zoomedQuadrants : radarQuadrants}
          rings={radarRings}
          activeQuadrant={activeQuadrant}
          zoomedQuadrant={zoomedQuadrant}
        />
        {isSuccess && (
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
        )}
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
