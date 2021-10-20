import React, { useEffect, useState } from 'react';
import { sortBy, prop, isEmpty, isNil, mathMod } from 'ramda';
import { useDispatch, useSelector } from 'react-redux';
import { useDebounce } from 'use-debounce';
import { useIntl } from 'react-intl';

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
  pluckNameFromList,
} from '../../shared/utils/radarUtils';
import { RadarQuadrant, RadarTechnology } from '../../shared/components/radar/radar.types';
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
import { Sidebar } from '../../shared/components/sidebar';
import { selectArea, selectLevel, selectSearch, selectTeam } from '../../modules/filters/filters.selectors';
import { INITIAL_ACTIVE_QUADRANT } from '../app.constants';
import { setArea } from '../../modules/filters/filters.actions';
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

  const [previouslyActiveQuadrant, setPreviouslyActiveQuadrant] = useState<number | null>(QUADRANT.bottomLeft);
  const [activeQuadrant, setActiveQuadrant] = useState<number | null>(null);
  const [loadingVisible, setLoadingVisible] = useState(true);
  const [displayLoading, setDisplayLoading] = useState(true);

  const [zoomedQuadrant, setZoomedQuadrant] = useState<number | null>(null);
  const [zoomedTechnologies, setZoomedTechnologies] = useState<RadarTechnology[]>([]);
  const [zoomedQuadrants, setZoomedQuadrants] = useState<RadarQuadrant[]>([]);

  const {
    contentfulQuery: { isSuccess },
    technologies,
    quadrants,
    rings,
    teams,
  } = useContentfulData();
  const radarTechnologies = getRadarTechnologies(technologies, activeQuadrant);
  const radarQuadrants = getRadarQuadrants(quadrants);
  const radarRings = getRadarRings(rings);
  const radarTeams = getRadarTeams(teams);

  useEffect(() => {
    if (!isEmpty(radarQuadrants) && !areaValue) {
      dispatch(setArea(radarQuadrants[INITIAL_ACTIVE_QUADRANT].name));
    }

    if (isSuccess) {
      setTimeout(() => {
        setLoadingVisible(false);
      }, LOADING_ANIMATION_MS);
      setTimeout(() => {
        setDisplayLoading(true);
      }, LOADING_ANIMATION_MS * 2);
    }
  }, [isSuccess]);

  const currentTechnologies = zoomedQuadrant ? zoomedTechnologies : radarTechnologies;

  useEffect(() => {

  }, [isSuccess]);

  useEffect(() => {
    if (!isEmpty(radarQuadrants)) {
      const quadrantForArea = radarQuadrants.find((quadrant) => quadrant.name === areaValue);
      setActiveQuadrant(quadrantForArea ? quadrantForArea.position : null);
    }
  }, [areaValue, radarQuadrants]);

  useEffect(() => {
    if (!isEmpty(technologies)) {
      const filtered = getFilteredTechnologies({
        searchText,
        currentTechnologies,
        rings: radarRings,
        teamValue,
        levelValue,
      });
      setFilteredTechnologies(filtered);
    }
  }, [searchText, zoomedQuadrant, levelValue, teamValue]);

  const updateActiveQuadrant = (newQuadrant: number | null) => {
    setPreviouslyActiveQuadrant(activeQuadrant);
    setActiveQuadrant(newQuadrant);
  };

  const rotateData = (newQuadrant: number) => {
    const moveQuadrantsBy = !isNil(activeQuadrant) ? newQuadrant - activeQuadrant : newQuadrant;

    const movedTechnologies = radarTechnologies.map((technology) => {
      return {
        ...technology,
        quadrant: mathMod(technology.quadrant + moveQuadrantsBy, 4),
      };
    });
    const movedQuadrants = radarQuadrants.map((quadrant) => ({
      ...quadrant,
      position: mathMod(quadrant.position + moveQuadrantsBy, 4),
    }));

    const sortedMovedQuadrants = sortBy(prop('position'), movedQuadrants);

    setZoomedTechnologies(movedTechnologies);
    setZoomedQuadrants(sortedMovedQuadrants);
  };

  const onZoomIn = () => {
    const targetQuadrant = QUADRANT.topLeft;
    updateActiveQuadrant(targetQuadrant);
    setZoomedQuadrant(targetQuadrant);
    rotateData(targetQuadrant);
  };

  const onZoomOut = () => {
    updateActiveQuadrant(previouslyActiveQuadrant);
    setZoomedQuadrant(null);
  };

  const [emptyResults] = useDebounce(!!searchText && isEmpty(filteredTechnologies), EMPTY_RESULTS_DEBOUNCE_TIME);

    const renderContent = () => (
      <>
        <SidebarWrapper>
          <Sidebar
            technologies={filteredTechnologies.length ? filteredTechnologies : currentTechnologies}
            emptyResults={emptyResults}
            rings={radarRings}
          />
        </SidebarWrapper>
        <Viewer fullRadar={!zoomedQuadrant}>
          <Radar
            technologies={filteredTechnologies.length ? filteredTechnologies : currentTechnologies}
            quadrants={zoomedQuadrant ? zoomedQuadrants : radarQuadrants}
            rings={radarRings}
            activeQuadrant={activeQuadrant}
            zoomedQuadrant={zoomedQuadrant}
            previouslyActiveQuadrant={previouslyActiveQuadrant}
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
      <Loading visible={loadingVisible} display={displayLoading}>
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
