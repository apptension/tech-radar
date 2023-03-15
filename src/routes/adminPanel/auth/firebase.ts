import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

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

export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  hd: 'apptension.com',
});
