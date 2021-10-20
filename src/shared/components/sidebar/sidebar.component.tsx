import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { List } from '../list';
import { Input } from '../input';
import { RadarRing, RadarTechnology } from '../radar/radar.types';
import { selectArea, selectLevel, selectTeam } from '../../../modules/filters/filters.selectors';
import { TagSize } from '../tag/tag.types';
import { renderWhenTrue } from '../../utils/rendering';
import { setArea, setLevel, setTeam } from '../../../modules/filters/filters.actions';
import { Container, FiltersContainer, Tag } from './sidebar.styles';

interface SidebarProps {
  technologies: RadarTechnology[];
  emptyResults: boolean;
  rings: RadarRing[];
}

export const Sidebar = ({ technologies, emptyResults, rings }: SidebarProps) => {
  const dispatch = useDispatch();
  const areaValue = useSelector(selectArea);
  const levelValue = useSelector(selectLevel);
  const teamValue = useSelector(selectTeam);

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

  return (
    <Container>
      <Input />
      <FiltersContainer>
        {renderAreaFilterTag(!!areaValue)}
        {renderLevelFilterTag(!!levelValue)}
        {renderTeamFilterTag(!!teamValue)}
      </FiltersContainer>
      <List technologies={technologies} emptyResults={emptyResults} rings={rings} />
    </Container>
  );
};
