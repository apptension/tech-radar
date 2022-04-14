import React from 'react';
import { useIntl } from 'react-intl';
import { isEmpty } from 'ramda';

import { useDispatch, useSelector } from 'react-redux';
import { renderWhenTrue } from '../../utils/rendering';
import { selectArea, selectLevel, selectTeam } from '../../../modules/filters/filters.selectors';
import { setArea, setLevel, setTeam } from '../../../modules/filters/filters.actions';
import { FilterType } from '../../../modules/filters/filters.types';
import { closeTechnologyPopup } from '../../../modules/technologyPopup/technologyPopup.actions';
import { toggleQuadrant } from '../../utils/radarUtils';
import { RadarQuadrant } from '../radar/radar.types';
import { Container, AreaDropdown, LevelDropdown, TeamDropdown } from './toolbar.styles';
import messages from './toolbar.messages';

export interface ToolbarProps {
  quadrants?: RadarQuadrant[];
  areaOptions?: string[];
  levelOptions?: string[];
  teamOptions?: string[];
  className?: string;
}

export const Toolbar = ({
  className,
  quadrants = [],
  areaOptions = [],
  levelOptions = [],
  teamOptions = [],
}: ToolbarProps) => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const areaValue = useSelector(selectArea);
  const levelValue = useSelector(selectLevel);
  const teamValue = useSelector(selectTeam);

  const handleUncheckQuadrants = () => {
    quadrants.map((el) => toggleQuadrant(el.position, false));
  };

  const handleAreaSelect = (option: FilterType) => {
    handleUncheckQuadrants();
    dispatch(closeTechnologyPopup());
    dispatch(setArea(option));
  };

  const handleLevelSelect = (option: FilterType) => {
    handleUncheckQuadrants();
    dispatch(closeTechnologyPopup());
    dispatch(setLevel(option));
  };

  const handleTeamSelect = (option: FilterType) => {
    handleUncheckQuadrants();
    dispatch(closeTechnologyPopup());
    dispatch(setTeam(option));
  };

  const renderAreaDropdown = renderWhenTrue(() => (
    <AreaDropdown
      value={areaValue}
      onSelect={handleAreaSelect}
      options={areaOptions}
      label={intl.formatMessage(messages.areaLabel)}
    />
  ));

  const renderLevelDropdown = renderWhenTrue(() => (
    <LevelDropdown
      value={levelValue}
      onSelect={handleLevelSelect}
      options={levelOptions}
      label={intl.formatMessage(messages.levelLabel)}
    />
  ));

  const renderTeamDropdown = renderWhenTrue(() => (
    <TeamDropdown
      value={teamValue}
      onSelect={handleTeamSelect}
      options={teamOptions}
      label={intl.formatMessage(messages.teamLabel)}
    />
  ));

  return (
    <Container className={className}>
      {renderAreaDropdown(!isEmpty(areaOptions))}
      {renderLevelDropdown(!isEmpty(teamOptions))}
      {renderTeamDropdown(!isEmpty(levelOptions))}
    </Container>
  );
};
