import { useHistory } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { signInWithGoogle } from '../adminPanel/auth/firebase';
import { LoginWrapper } from './login.styles';
import messages from './login.messages';

export const Login = () => {
  const intl = useIntl();
  const history = useHistory();

  const handleSignIn = () => {
    signInWithGoogle(history);
  };

  return (
    <LoginWrapper>
      <p>{intl.formatMessage(messages.loginInfo)}</p>
      <button onClick={handleSignIn}>{intl.formatMessage(messages.signInGoogle)}</button>
    </LoginWrapper>
  );
};
