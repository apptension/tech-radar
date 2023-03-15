import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { auth, googleProvider } from '../../../routes/adminPanel/auth/firebase';
import { ROUTES } from '../../../routes/app.constants';
import { getVerifyUser } from '../../services/api/endpoints';
import { reportError } from '../../utils/reportError';

interface State {
  user: AdminPanelUser | null;
  isLoading: boolean;
  signIn: () => Promise<void>;
  logout: () => Promise<void>;
}

export const AdminPanelContext = createContext<State | undefined>(undefined);

interface AdminPanelContextProviderProps {
  children: ReactNode;
}

interface AdminPanelUser {
  email: string;
  uid: string;
}

export const AdminPanelContextProvider = ({ children }: AdminPanelContextProviderProps) => {
  const history = useHistory();
  const [user, setUser] = useState<AdminPanelUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const signIn = async () => {
    setIsLoading(true);
    try {
      const { user } = await signInWithPopup(auth, googleProvider);
      await getVerifyUser(user.email || '');
      history.push(ROUTES.adminPanel);
    } catch (err) {
      reportError(err);
    }
    setIsLoading(false);
  };

  const logout = async () => {
    await signOut(auth);
    history.push(ROUTES.adminLogin);
  };

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          await getVerifyUser(user.email || '');
          setUser({ email: user.email || '', uid: user.uid });
        } catch (err) {
          setUser(null);
          signOut(auth);
        }
        return setIsLoading(false);
      }
      setUser(null);
      setIsLoading(false);
    });
  }, []);

  const value = { user, isLoading, signIn, logout };

  return <AdminPanelContext.Provider value={value}>{children}</AdminPanelContext.Provider>;
};

export const useAdminPanelContext = () => {
  const context = useContext(AdminPanelContext);

  if (!context) {
    throw new Error('AdminPanelContext used outside of Provider!');
  }

  return context;
};
