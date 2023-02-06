import { useHistory } from 'react-router-dom';
import { signInWithGoogle } from '../adminPanel/auth/firebase';
import { LoginWrapper } from './login.styles';

export const Login = () => {
  const history = useHistory();

  const handleSignIn = () => {
    signInWithGoogle(history);
  };

  return (
    <LoginWrapper>
      <p>You don't have access to AdminPanel. You have to login in.</p>
      <button onClick={handleSignIn}> Sign In With Google </button>
    </LoginWrapper>
  );
};
