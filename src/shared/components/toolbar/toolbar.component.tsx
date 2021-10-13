import React from 'react';
import { FormattedMessage } from 'react-intl';

import { Container, AreaDropdown, LevelDropdown, TeamDropdown } from './toolbar.styles';
import messages from './toolbar.messages';

export const Toolbar = () => {
  return (
    <Container>
      <FormattedMessage {...messages.areaLabel}>
        {(areaLabel) => <AreaDropdown title={areaLabel.toString()} />}
      </FormattedMessage>
      <FormattedMessage {...messages.levelLabel}>
        {(levelLabel) => <LevelDropdown title={levelLabel.toString()} />}
      </FormattedMessage>
      <FormattedMessage {...messages.teamLabel}>
        {(teamLabel) => <TeamDropdown title={teamLabel.toString()} />}
      </FormattedMessage>
    </Container>
  );
};