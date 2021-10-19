import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { isEmpty } from 'ramda';

import { renderWhenTrue } from '../../utils/rendering';
import { Container, AreaDropdown, LevelDropdown, TeamDropdown } from './toolbar.styles';
import messages from './toolbar.messages';

export interface ToolbarProps {
  areaOptions?: string[];
  levelOptions?: string[];
  teamOptions?: string[];
  className?: string;
}

export const Toolbar = ({ className, areaOptions = [], levelOptions = [], teamOptions = [] }: ToolbarProps) => {
  const intl = useIntl();
  const [toolbarArea, setToolbarArea] = useState<string | null>(null);
  const [toolbarLevel, setToolbarLevel] = useState<string | null>(null);
  const [toolbarTeam, setToolbarTeam] = useState<string | null>(null);

  const renderAreaDropdown = renderWhenTrue(() => (
    <AreaDropdown
      value={toolbarArea}
      setValue={setToolbarArea}
      options={areaOptions}
      label={intl.formatMessage(messages.areaLabel)}
    />
  ));

  const renderLevelDropdown = renderWhenTrue(() => (
    <LevelDropdown
      value={toolbarLevel}
      setValue={setToolbarLevel}
      options={levelOptions}
      label={intl.formatMessage(messages.levelLabel)}
    />
  ));

  const renderTeamDropdown = renderWhenTrue(() => (
    <TeamDropdown
      value={toolbarTeam}
      setValue={setToolbarTeam}
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
