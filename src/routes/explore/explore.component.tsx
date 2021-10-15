import React from 'react';

import { Radar } from '../../shared/components/radar';
import { List } from '../../shared/components/list';
import { Toolbar } from '../../shared/components/toolbar';
import { useContentfulData } from '../../shared/hooks/useContentfulData/useContentfulData';
import { TitleTagSize } from '../../shared/components/titleTag/titleTag.types';
import { color } from '../../theme';
import { Container, TitleTag } from './explore.styles';

type Point = {
  color: string;
  id: string;
  inactive: boolean;
  index: number;
  label: string;
  quadrant: number;
  ring: number;
  segment: {
    clipx: (d: Point) => void;
    clipy: (d: Point) => void;
    random: (d: Point) => void;
  };
  vx: number;
  vy: number;
  x: number;
  y: number;
};

export const Explore = () => {
  const { technologies, quadrants, rings } = useContentfulData();

  const highlightLegend = ({ d, mode = 'on' }: { d: Point; mode: string }) => {
    const listItem = document.querySelector(`#list-item-${d.id}`) as HTMLDivElement;
    if (listItem) {
      listItem.style.color = mode === 'on' ? color.white : color.boulder;
    }
  };

  return (
    <Container>
      <TitleTag size={TitleTagSize.SMALL} withLogo />

      <List />
      <Radar entries={technologies} quadrants={quadrants} rings={rings} highlightLegend={highlightLegend} />
      <Toolbar />
    </Container>
  );
};
