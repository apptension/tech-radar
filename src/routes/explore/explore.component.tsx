import React, { useState } from 'react';

import { List } from '../../shared/components/list';
import { Radar } from '../../shared/components/radar';
import { useContentfulData } from '../../shared/hooks/useContentfulData/useContentfulData';
import { TitleTagSize } from '../../shared/components/titleTag/titleTag.types';
import { ZOOMED_QUADRANT } from '../../shared/components/radar/radar.constants';
import { Container, TitleTag, Viewer, Sidebar, Toolbar, ZoomControls } from './explore.styles';

export const Explore = () => {
  const [previouslyActiveQuadrant, setPreviouslyActiveQuadrant] = useState<number>(ZOOMED_QUADRANT.bottomLeft);
  const [activeQuadrant, setActiveQuadrant] = useState(ZOOMED_QUADRANT.topLeft);
  const [zoomedQuadrant, setZoomedQuadrant] = useState<number | null>(null);

  const { technologies, quadrants, rings } = useContentfulData();

  const updateActiveQuadrant = (newQuadrant: number) => {
    setPreviouslyActiveQuadrant(activeQuadrant);
    setActiveQuadrant(newQuadrant);
  };

  const rotateData = (newQuadrant: number) => {
    // change quadrant in data so that newQuadrant is quadrant 2
  };

  const onZoomIn = () => {
    const targetQuadrant = ZOOMED_QUADRANT.topLeft;

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

      <Sidebar>
        <List />
      </Sidebar>
      <Viewer>
        <Radar
          technologies={technologies}
          quadrants={quadrants}
          rings={rings}
          activeQuadrant={activeQuadrant}
          zoomedQuadrant={zoomedQuadrant}
          previouslyActiveQuadrant={previouslyActiveQuadrant}
        />
        <Toolbar />
        <ZoomControls onZoomIn={onZoomIn} onZoomOut={onZoomOut} />
      </Viewer>
    </Container>
  );
};
