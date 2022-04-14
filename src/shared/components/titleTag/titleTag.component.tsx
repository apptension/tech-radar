import React from 'react';
import { ThemeProvider } from 'styled-components';

import { FormattedMessage } from 'react-intl';
import { TagSize } from '../tag/tag.types';
import { ROUTES } from '../../../routes/app.constants';
import { Container, TitleWithTagWrapper, Title, VersionTag, Logo, LogoLink } from './titleTag.styles';
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
        {withLogo && (
          <LogoLink to={ROUTES.home} withBorder={false} withoutHoverEffects>
            <Logo full={false} />
          </LogoLink>
        )}
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
