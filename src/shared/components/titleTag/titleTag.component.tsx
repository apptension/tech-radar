import React from 'react';
import { ThemeProvider } from 'styled-components';

import { FormattedMessage } from 'react-intl';
import { TagSize } from '../tag/tag.types';
import { Container, TitleWithTagWrapper, Title, VersionTag, Logo } from './titleTag.styles';
import { TitleTagSize, TitleTagTheme } from './titleTag.types';
import messages from './titleTag.messages';

export interface TitleTagProps {
  size?: TitleTagSize;
  withLogo?: boolean;
  className?: string;
}

export const TitleTag = ({ size = TitleTagSize.LARGE, withLogo = false, className }: TitleTagProps) => {
  const theme: TitleTagTheme = { size };

  return (
    <ThemeProvider theme={theme}>
      <Container className={className}>
        {withLogo && <Logo full={false} />}
        <TitleWithTagWrapper>
          <Title>
            <FormattedMessage {...messages.title} />
          </Title>
          <VersionTag size={size === TitleTagSize.LARGE ? TagSize.LARGE : TagSize.SMALL} />
        </TitleWithTagWrapper>
      </Container>
    </ThemeProvider>
  );
};
