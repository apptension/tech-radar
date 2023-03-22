import { ReactComponent as PhoneSVG } from '../../../images/icons/phone.svg';
import { ReactComponent as EnvelopeSVG } from '../../../images/icons/envelope.svg';
import { Link } from '../link';
import { ButtonVariant } from '../button/button.types';
import { ContactOption, ContactsContainer, ContactText, Container, LeftSideContainer, Text } from './getInTouch.styles';

interface GetInTouchProps {
  asPopup?: boolean;
}

export const GetInTouch = ({ asPopup = false }: GetInTouchProps) => {
  if (asPopup) {
    return (
      <Container>
        <LeftSideContainer>
          <Text>Interested in working with Apptension?</Text>
          <Link to="https://www.apptension.com/get-in-touch" variant={ButtonVariant.PRIMARY}>
            Get in touch
          </Link>
        </LeftSideContainer>
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

  return (
    <LeftSideContainer>
      <Text>Interested in working with Apptension?</Text>
      <Link to="https://www.apptension.com/get-in-touch" variant={ButtonVariant.PRIMARY}>
        Get in touch
      </Link>
    </LeftSideContainer>
  );
};
