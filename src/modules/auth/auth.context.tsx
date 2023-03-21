import { onAuthStateChanged, signOut } from 'firebase/auth';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { auth } from '../../shared/services/firebase';

interface User {
  email: string;
  displayName: string;
  uid: string;
  avatar: string;
}

interface State {
  user: User | null;
  isLoading: boolean;
  logout: () => void;
}

export const AuthContext = createContext<State | undefined>(undefined);

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const initializeUser = (user: User) => {
    setUser(user);
  };

  const logout = () => {
    signOut(auth);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { email, uid, displayName, photoURL } = user;
        initializeUser({ email: email || '', uid, displayName: displayName || '', avatar: photoURL || '' });
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });
  }, []);

  const value = { user, isLoading, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('AuthContext used outside of Provider!');
  }

  return context;
};
