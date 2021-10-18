import React from 'react';
import dayjs from 'dayjs';

import { FormattedMessage } from 'react-intl';
import { Container } from './lastUpdateInfo.styles';
import messages from './lastUpdateInfo.messages';

export interface LastUpdateInfoProps {
  date: Date;
  className?: string;
}

export const LastUpdateInfo = ({ date, className }: LastUpdateInfoProps) => {
  const formattedDate = dayjs(date).format('DD-MM-YYYY');

  return (
    <Container className={className}>
      <FormattedMessage {...messages.lastUpdate} values={{ date: formattedDate }} />
    </Container>
  );
};
