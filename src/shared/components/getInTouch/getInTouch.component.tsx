import { ReactComponent as PhoneSVG } from '../../../images/icons/phone.svg';
import { ReactComponent as EnvelopeSVG } from '../../../images/icons/envelope.svg';
import { Link } from '../link';
import { ButtonVariant } from '../button/button.types';
import { ContactOption, ContactsContainer, ContactText, Container, LeftSideContainer, Text } from './getInTouch.styles';

interface GetInTouchProps {
  asPopup?: boolean;
}

const GET_IN_TOUCH_URL = 'https://www.apptension.com/get-in-touch';

export const GetInTouch = ({ asPopup = false }: GetInTouchProps) => {
  if (asPopup) {
    return (
      <Container>
        <LeftSideInfo />
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
      </Container>
    );
  }

  return <LeftSideInfo />;
};

const LeftSideInfo = () => (
  <LeftSideContainer>
    <Text>Interested in working with Apptension?</Text>
    <Link to={GET_IN_TOUCH_URL} variant={ButtonVariant.PRIMARY}>
      Get in touch
    </Link>
  </LeftSideContainer>
);
