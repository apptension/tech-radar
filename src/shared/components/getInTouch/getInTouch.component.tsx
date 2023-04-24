import { useIntl } from 'react-intl';
import { ReactComponent as PhoneSVG } from '../../../images/icons/phone.svg';
import { ReactComponent as EnvelopeSVG } from '../../../images/icons/envelope.svg';
import { ButtonIcon, ButtonVariant } from '../button/button.types';
import {
  ContactOption,
  ContactsContainer,
  ContactText,
  Container,
  FlexContainer,
  LinkContainer,
  StyledLink,
} from './getInTouch.styles';
import getInTouchMessages from './getInTouch.messages';

interface GetInTouchProps {
  asPopup?: boolean;
}

const GET_IN_TOUCH_URL = 'https://www.apptension.com/get-in-touch';

export const GetInTouch = ({ asPopup = false }: GetInTouchProps) => {
  const intl = useIntl();

  if (asPopup) {
    return (
      <Container>
        <FlexContainer>
          <ContactsContainer>
            <ContactOption>
              <EnvelopeSVG />
              <ContactText href="mailto:contact@apptension.com">contact@apptension.com</ContactText>
            </ContactOption>

            <ContactOption>
              <PhoneSVG />
              <ContactText href="tel:+48793925552">+48 793 925 552</ContactText>
            </ContactOption>
          </ContactsContainer>

          <StyledLink to={GET_IN_TOUCH_URL} variant={ButtonVariant.PRIMARY} icon={ButtonIcon.GET_IN_TOUCH}>
            {intl.formatMessage(getInTouchMessages.getInTouch)}
          </StyledLink>
        </FlexContainer>
      </Container>
    );
  }

  return (
    <LinkContainer>
      <StyledLink to={GET_IN_TOUCH_URL} variant={ButtonVariant.PRIMARY} icon={ButtonIcon.GET_IN_TOUCH}>
        {intl.formatMessage(getInTouchMessages.getInTouch)}
      </StyledLink>
    </LinkContainer>
  );
};
