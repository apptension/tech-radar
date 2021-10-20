import React, { useState } from 'react';
import { sortBy, prop } from 'ramda';

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
import { Container, TitleTag, Viewer, SidebarWrapper, Toolbar, ZoomControls } from './explore.styles';

export const Explore = () => {
  const [searchText, setSearchText] = useState(''); //TODO move to state

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

  return (
    <Container>
      <TitleTag size={TitleTagSize.SMALL} withLogo />
      <SidebarWrapper>
        <Sidebar technologies={radarTechnologies} setSearchText={setSearchText} />
      </SidebarWrapper>
      <Viewer fullRadar={!zoomedQuadrant}>
        <Radar
          technologies={zoomedQuadrant ? zoomedTechnologies : radarTechnologies}
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
