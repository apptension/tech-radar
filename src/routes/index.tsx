import { Route, Switch } from 'react-router-dom';
import { IntlProvider } from 'react-intl';

import { AdminPanelContextProvider } from '../shared/components/adminPanel/adminPanelContext';
import { AdminRoute } from '../shared/components/routes/adminRoute';
import { DEFAULT_LOCALE, translationMessages } from '../i18n';
import { asyncComponent } from '../shared/utils/asyncComponent';
import { AuthRoute } from '../shared/components/routes/authRoute/authRoute.component';
import { MatrixContextProvider } from '../modules/matrix/matrix.context';
import { AuthContextProvider } from '../modules/auth/auth.context';
import { ScrollToTop } from '../shared/components/scrollToTop';
import { AppComponent as App } from './app.component';
import { ROUTES } from './app.constants';
import { Login as AdminLogin } from './admin/login';
import { NewEntry } from './admin/newEntry';
import { Login } from './matrix/login';
import { Personal } from './matrix/personal';
import { Knowledge } from './matrix/knowledge';
import { AdditionalInfo } from './matrix/additionalInfo';
import { Overview } from './matrix/overview';
import { FinalStep } from './matrix/finalStep';
import { MyProfile } from './matrix/myProfile/myProfile.component';
//<-- IMPORT ROUTE -->

// @ts-ignore
const Home = asyncComponent(() => import('./explore'), 'Explore');
// @ts-ignore
const NotFound = asyncComponent(() => import('./notFound'), 'NotFound');
// @ts-ignore
const AdminPanel = asyncComponent(() => import('./admin/adminPanel'), 'AdminPanel');

export default () => {
  return (
    <Switch>
      <App>
        <Switch>
          <Route exact path={ROUTES.home}>
            <Home />
          </Route>

          <Route path={ROUTES.admin}>
            <AdminPanelContextProvider>
              <Route exact path={ROUTES.adminLogin}>
                <AdminLogin />
              </Route>

              <AdminRoute exact path={ROUTES.adminPanel}>
                <AdminPanel />
              </AdminRoute>

              <AdminRoute exact path={ROUTES.adminNewEntry}>
                <NewEntry />
              </AdminRoute>
            </AdminPanelContextProvider>
          </Route>

          <AuthContextProvider>
            <AuthRoute exact path={ROUTES.myProfile}>
              <MyProfile />
            </AuthRoute>
            <Route path={ROUTES.matrix}>
              <MatrixContextProvider>
                <ScrollToTop>
                  <Route exact path={ROUTES.matrixLogin}>
                    <Login />
                  </Route>

                  <AuthRoute exact path={ROUTES.matrixPersonal}>
                    <Personal />
                  </AuthRoute>

                  <AuthRoute exact path={ROUTES.matrixKnowledge}>
                    <Knowledge />
                  </AuthRoute>

                  <AuthRoute exact path={ROUTES.matrixAdditionalInfo}>
                    <AdditionalInfo />
                  </AuthRoute>

                  <AuthRoute exact path={ROUTES.matrixOverview}>
                    <Overview />
                  </AuthRoute>

                  <AuthRoute exact path={ROUTES.matrixFinal}>
                    <FinalStep />
                  </AuthRoute>
                </ScrollToTop>
              </MatrixContextProvider>
            </Route>
          </AuthContextProvider>

          <Route>
            <NotFound />
          </Route>
        </Switch>
      </App>

      <IntlProvider locale={DEFAULT_LOCALE} messages={translationMessages[DEFAULT_LOCALE]}>
        <Route>
          <NotFound />
        </Route>
      </IntlProvider>
    </Switch>
  );
};
