import { onAuthStateChanged } from 'firebase/auth';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { auth } from '../../shared/services/firebase';

interface User {
  email: string;
  displayName: string;
  uid: string;
}

interface State {
  user: User | null;
  isLoading: boolean;
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

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { email, uid, displayName } = user;
        initializeUser({ email: email || '', uid, displayName: displayName || '' });
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });
  }, []);

  const value = { user, isLoading };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('AuthContext used outside of Provider!');
  }

  return context;
};
