import { Redirect, Route, RouteProps } from 'react-router';
import { useAuthContext } from '../../../../modules/auth/auth.context';
import { ROUTES } from '../../../../routes/app.constants';

export const AuthRoute = ({ children, ...rest }: RouteProps) => {
  const { user, isLoading } = useAuthContext();

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isLoading ? null : user ? (
          children
        ) : (
          <Redirect to={{ pathname: ROUTES.matrixLogin, state: { from: location } }} />
        )
      }
    />
  );
};
