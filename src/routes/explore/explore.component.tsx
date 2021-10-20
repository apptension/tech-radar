import React, { useState, useEffect } from 'react';
import { sortBy, prop, isEmpty } from 'ramda';

import { useSelector } from 'react-redux';
import { useDebounce } from 'use-debounce';
import { Radar } from '../../shared/components/radar';
import { useContentfulData } from '../../shared/hooks/useContentfulData/useContentfulData';
import { TitleTagSize } from '../../shared/components/titleTag/titleTag.types';
import { QUADRANT } from '../../shared/components/radar/radar.constants';
import {
  getRadarQuadrants,
  getRadarRings,
  getRadarTeams,
  getRadarTechnologies,
  pluckNameFromList,
} from '../../shared/utils/radarUtils';
import { RadarQuadrant, RadarTechnology } from '../../shared/components/radar/radar.types';
import { Sidebar } from '../../shared/components/sidebar';
import { selectSearch } from '../../modules/filters/filters.selectors';
import { Container, TitleTag, Viewer, SidebarWrapper, Toolbar, ZoomControls } from './explore.styles';

export const Explore = () => {
  const searchText = useSelector(selectSearch);
  const [filteredTechnologies, setFilteredTechnologies] = useState<RadarTechnology[]>([]);

  const [previouslyActiveQuadrant, setPreviouslyActiveQuadrant] = useState<number>(QUADRANT.bottomLeft);
  const [activeQuadrant, setActiveQuadrant] = useState(QUADRANT.bottomLeft);

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

  const currentTechnologies = zoomedQuadrant ? zoomedTechnologies : radarTechnologies;

  //TODO set activeQuadrant based on filter

  const filterTechnologies = () => {
    //TODO add all filters
    if (!searchText) {
      setFilteredTechnologies(currentTechnologies);
    } else {
      const filtered = currentTechnologies.filter((technology) =>
        technology.label.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredTechnologies(filtered);
    }
  };

  useEffect(() => {
    if (!isEmpty(technologies)) filterTechnologies();
  }, [searchText, zoomedQuadrant]);

  const updateActiveQuadrant = (newQuadrant: number) => {
    setPreviouslyActiveQuadrant(activeQuadrant);
    setActiveQuadrant(newQuadrant);
  };

  const rotateData = (newQuadrant: number) => {
    const moveQuadrantsBy = newQuadrant - activeQuadrant;

    const movedTechnologies = radarTechnologies.map((technology) => ({
      ...technology,
      quadrant: (technology.quadrant + moveQuadrantsBy) % 4,
    }));
    const movedQuadrants = radarQuadrants.map((quadrant) => ({
      ...quadrant,
      position: (quadrant.position + moveQuadrantsBy) % 4,
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

  const [emptyResults] = useDebounce(!!searchText && isEmpty(filteredTechnologies), 100);

  return (
    <Container>
      <TitleTag size={TitleTagSize.SMALL} withLogo />
      <SidebarWrapper>
        <Sidebar
          technologies={filteredTechnologies.length ? filteredTechnologies : currentTechnologies}
          emptyResults={emptyResults}
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
    </Container>
  );
};
