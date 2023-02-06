import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { History } from 'history';
import { ROUTES } from '../../app.constants';

const firebaseConfig = {
  apiKey: 'AIzaSyAMKm7Zv0ZZoiONMfScv8RMZjn4Hy7wTzE',
  authDomain: 'apptension-tech-radar.firebaseapp.com',
  projectId: 'apptension-tech-radar',
  storageBucket: 'apptension-tech-radar.appspot.com',
  messagingSenderId: '387773266107',
  appId: '1:387773266107:web:520eadf4697074e2f8119e',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  hd: 'apptension.com',
});

export const signInWithGoogle = (history: History) => {
  signInWithPopup(auth, provider)
    .then(async (result) => {
      const { user } = result;
      const token = await user.getIdToken();
      if (token) {
        sessionStorage.setItem('accessToken', token);
        history.push(ROUTES.adminPanel);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const signOutFromAdminPanel = (history: History) => {
  sessionStorage.removeItem('accessToken');
  signOut(auth);
  history.push(ROUTES.login);
};
