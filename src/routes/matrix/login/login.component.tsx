import { ButtonIcon, ButtonSize } from '../../../shared/components/button/button.types';
import matrixLogo from '../../../images/matrix-logo.png';
import teamPhoto from '../../../images/apptension-team.png';
import {
  MainContainer,
  ContentContainer,
  Header,
  PatternContainer,
  Photo,
  PhotoContainer,
  Pattern,
  InfoText,
  Title,
  LoginButton,
  InfoSpacer,
} from './login.styles';

export const Login = () => {
  return (
    <main>
      <Header>
        <Photo src={matrixLogo} />
      </Header>
      <MainContainer>
        <ContentContainer>
          <Title>Share your expertise with us!</Title>
          <InfoText>
            In Apptension we want to create a great workplace where people can try out their knowledge in interesting
            projects, learn something new and be open to share this experience with others.
          </InfoText>
          <InfoSpacer />
          <InfoText>You can help us a lot by filling out this form!</InfoText>

          <LoginButton size={ButtonSize.LARGE} icon={ButtonIcon.ARROW}>
            Log in to start
          </LoginButton>
        </ContentContainer>
        <PhotoContainer>
          <Photo src={teamPhoto} />
        </PhotoContainer>
      </MainContainer>
      <PatternContainer>
        <Pattern />
      </PatternContainer>
    </main>
  );
};
