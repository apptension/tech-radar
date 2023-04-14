import { useIntl } from 'react-intl';
import { ButtonIcon, ButtonSize } from '../../../shared/components/button/button.types';
import { MatrixHeader } from '../../../shared/components/matrix/matrixHeader';
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
import loginMessages from './login.messages';

export const Login = () => {
  const { signInWithGoogle } = useLogin();
  const intl = useIntl();

  return (
    <main>
      <MatrixHeader />
      <MainContainer>
        <ContentContainer>
          <Title>{intl.formatMessage(loginMessages.shareExpertise)}</Title>
          <InfoText>{intl.formatMessage(loginMessages.wantToCreate)}</InfoText>
          <InfoSpacer />
          <InfoText>{intl.formatMessage(loginMessages.youCanHelp)}</InfoText>

          <LoginButton size={ButtonSize.LARGE} icon={ButtonIcon.ARROW} onClick={signInWithGoogle}>
            {intl.formatMessage(loginMessages.toStart)}
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
