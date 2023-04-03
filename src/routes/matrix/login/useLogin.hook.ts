import { signInWithPopup } from 'firebase/auth';
import { useHistory } from 'react-router';
import { auth, googleProvider } from '../../../shared/services/firebase';
import { ROUTES } from '../../app.constants';

export const useLogin = () => {
  const history = useHistory();

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      history.push(ROUTES.matrixPersonal);
    } catch (err) {
      console.error(err);
    }
  };

  return { signInWithGoogle };
};
