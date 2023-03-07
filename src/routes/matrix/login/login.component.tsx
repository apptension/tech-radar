import { ButtonIcon, ButtonSize } from '../../../shared/components/button/button.types';
import { MatrixHeader } from '../../../shared/components/matrixHeader';
import teamPhoto from '../../../images/apptension-team.png';
import {
  MainContainer,
  ContentContainer,
  PatternContainer,
  Photo,
  PhotoContainer,
  Pattern,
  InfoText,
  Title,
  LoginButton,
  InfoSpacer,
} from './login.styles';
import { useLogin } from './useLogin.hook';

export const Login = () => {
  const { signInWithGoogle } = useLogin();

  return (
    <main>
      <MatrixHeader />
      <MainContainer>
        <ContentContainer>
          <Title>Share your expertise with us!</Title>
          <InfoText>
            In Apptension we want to create a great workplace where people can try out their knowledge in interesting
            projects, learn something new and be open to share this experience with others.
          </InfoText>
          <InfoSpacer />
          <InfoText>You can help us a lot by filling out this form!</InfoText>

          <LoginButton size={ButtonSize.LARGE} icon={ButtonIcon.ARROW} onClick={signInWithGoogle}>
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
