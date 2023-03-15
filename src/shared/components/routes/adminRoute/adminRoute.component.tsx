import { Redirect, Route, RouteProps } from 'react-router';
import { ROUTES } from '../../../../routes/app.constants';
import { useAdminPanelContext } from '../../adminPanel/adminPanelContext';

export const AdminRoute = ({ children, ...props }: RouteProps) => {
  const { user, isLoading } = useAdminPanelContext();

  return (
    <Route
      {...props}
      render={({ location }) =>
        isLoading ? null : user ? children : <Redirect to={{ pathname: ROUTES.login, state: { from: location } }} />
      }
    />
  );
};
