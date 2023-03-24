import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { IntlProvider } from 'react-intl';

import { DEFAULT_LOCALE, translationMessages } from '../i18n';
import { asyncComponent } from '../shared/utils/asyncComponent';
import { AuthRoute } from '../shared/components/routes/authRoute/authRoute.component';
import { MatrixContextProvider } from '../modules/matrix/matrix.context';
import { AuthContextProvider } from '../modules/auth/auth.context';
import { ScrollToTop } from '../shared/components/scrollToTop';
import { AppComponent as App } from './app.component';
import { ROUTES } from './app.constants';
import { Login } from './matrix/login';
import { Personal } from './matrix/personal';
import { Knowledge } from './matrix/knowledge';
import { AdditionalInfo } from './matrix/additionalInfo';
import { Overview } from './matrix/overview';
import { FinalStep } from './matrix/finalStep';
import { MyProfile } from './matrix/myProfile/myProfile.component';
//<-- IMPORT ROUTE -->

// @ts-ignore
const Home = asyncComponent(() => import('./home'), 'Home');
// @ts-ignore
const Explore = asyncComponent(() => import('./explore'), 'Explore');
// @ts-ignore
const NotFound = asyncComponent(() => import('./notFound'), 'NotFound');

export default () => {
  return (
    <Switch>
      <App>
        <Switch>
          <Route exact path={ROUTES.home}>
            <Home />
          </Route>

          <Route exact path={ROUTES.explore}>
            <Explore />
          </Route>
          {/* <-- INJECT ROUTE --> */}

          <AuthContextProvider>
            <AuthRoute exact path={ROUTES.myProfile}>
              <MyProfile />
            </AuthRoute>
            <Route path={'/matrix'}>
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
