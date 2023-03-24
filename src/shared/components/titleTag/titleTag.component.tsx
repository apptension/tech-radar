import { ThemeProvider } from 'styled-components';
import { ReactNode } from 'react';
import { FormattedMessage } from 'react-intl';
import { TagSize } from '../tag/tag.types';
import { ROUTES } from '../../../routes/app.constants';
import {
  Container,
  TitleWithTagWrapper,
  Title,
  VersionTag,
  Logo,
  LogoLink,
  CompanyText,
  TopContainer,
  OverallContainer,
  ContentContainer,
} from './titleTag.styles';
import { TitleTagSize, TitleTagTheme } from './titleTag.types';
import messages from './titleTag.messages';

export interface TitleTagProps {
  size?: TitleTagSize;
  withLogo?: boolean;
  className?: string;
  withCompanyText?: boolean;
}

export const TitleTag = ({
  size = TitleTagSize.LARGE,
  withLogo = false,
  withCompanyText = false,
  className,
}: TitleTagProps) => {
  const theme: TitleTagTheme = { size };

  const LogoContent = ({ children }: { children: ReactNode }) => (
    <ThemeProvider theme={theme}>
      <Container className={className}>
        <OverallContainer>
          {withLogo && (
            <LogoLink to={ROUTES.home} withBorder={false} withoutHoverEffects>
              <Logo full={false} />
            </LogoLink>
          )}
          {children}
        </OverallContainer>
      </Container>
    </ThemeProvider>
  );

  if (withCompanyText) {
    return (
      <LogoContent>
        <ContentContainer>
          <TopContainer>
            <TitleWithTagWrapper>
              <Title>
                <FormattedMessage {...messages.title} />
              </Title>
            </TitleWithTagWrapper>
          </TopContainer>
          {withCompanyText && (
            <CompanyText>
              <FormattedMessage {...messages.byCompany} />
            </CompanyText>
          )}
        </ContentContainer>
        <VersionTag size={size === TitleTagSize.LARGE ? TagSize.LARGE : TagSize.SMALL} />
      </LogoContent>
    );
  }

  return (
    <LogoContent>
      <TitleWithTagWrapper>
        <Title>
          <FormattedMessage {...messages.title} />
        </Title>
        <VersionTag size={size === TitleTagSize.LARGE ? TagSize.LARGE : TagSize.SMALL} />
      </TitleWithTagWrapper>
    </LogoContent>
  );
};
