import { Helmet } from 'react-helmet-async';
import { FormattedMessage, useIntl } from 'react-intl';

import { Logo } from '../../shared/components/logo';
import { Background } from '../../shared/components/background';
import { ROUTES } from '../app.constants';
import { ButtonIcon, ButtonSize } from '../../shared/components/button/button.types';
import { Link } from '../../shared/components/link';
import { useMediaQuery } from '../../shared/hooks/useMediaQuery';
import { Breakpoint } from '../../theme/media';
import messages from './notFound.messages';
import {
  Title,
  Container,
  Content,
  Description,
  ExploreLinkContainer,
  Header,
  LogoWrapper,
  TextContent,
} from './notFound.styles';

export const NotFound = () => {
  const intl = useIntl();
  const { matches: isDesktop } = useMediaQuery({ above: Breakpoint.DESKTOP });

  return (
    <Container>
      <Helmet
        title={intl.formatMessage({
          defaultMessage: 'Not found',
          description: 'Not found / page title',
        })}
      />
      <Background />
      <Header>
        <LogoWrapper>
          {isDesktop ? (
            <Logo />
          ) : (
            <Link to="https://apptension.com" withBorder={false}>
              <Logo full={false} />
            </Link>
          )}
        </LogoWrapper>
        {isDesktop && (
          <Link to="https://apptension.com" icon={ButtonIcon.OUT}>
            <FormattedMessage {...messages.backToMainPageButton} />
          </Link>
        )}
      </Header>
      <Content>
        <TextContent>
          <Title>
            <FormattedMessage {...messages.title} />
          </Title>
          <Description>
            <FormattedMessage {...messages.description} />
          </Description>
          <ExploreLinkContainer>
            <Link to={ROUTES.home} size={isDesktop ? ButtonSize.LARGE : ButtonSize.REGULAR} icon={ButtonIcon.ARROW}>
              <FormattedMessage {...messages.backToHomeButton} />
            </Link>
          </ExploreLinkContainer>
        </TextContent>
      </Content>
    </Container>
  );
};
