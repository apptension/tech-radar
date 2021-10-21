import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useIntl } from 'react-intl';

import { useDebouncedCallback } from 'use-debounce';
import { List } from '../list';
import { Input } from '../input';
import { RadarRing, RadarTechnology } from '../radar/radar.types';
import { selectArea, selectLevel, selectTeam } from '../../../modules/filters/filters.selectors';
import { TagSize } from '../tag/tag.types';
import { renderWhenTrue } from '../../utils/rendering';
import { setArea, setLevel, setSearch, setTeam } from '../../../modules/filters/filters.actions';
import messages from '../input/input.messages';
import { INPUT_DEBOUNCE_TIME } from '../input/input.constants';
import { Container, FiltersContainer, Tag } from './sidebar.styles';

interface SidebarProps {
  technologies: RadarTechnology[];
  emptyResults: { search: boolean; filters: boolean };
  rings: RadarRing[];
}

export const Sidebar = ({ technologies, emptyResults, rings }: SidebarProps) => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const areaValue = useSelector(selectArea);
  const levelValue = useSelector(selectLevel);
  const teamValue = useSelector(selectTeam);

  const debouncedOnTextChange = useDebouncedCallback((text: string) => {
    dispatch(setSearch(text));
  }, INPUT_DEBOUNCE_TIME);
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
      <Input withSearchIcon placeholder={intl.formatMessage(messages.placeholder)} onChange={debouncedOnTextChange} />
      <FiltersContainer>
        {renderAreaFilterTag(!!areaValue)}
        {renderLevelFilterTag(!!levelValue)}
        {renderTeamFilterTag(!!teamValue)}
      </FiltersContainer>
      <List technologies={technologies} emptyResults={emptyResults} rings={rings} />
    </Container>
  );
};
