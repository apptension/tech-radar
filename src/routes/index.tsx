import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { IntlProvider } from 'react-intl';

import { DEFAULT_LOCALE, translationMessages } from '../i18n';
import { asyncComponent } from '../shared/utils/asyncComponent';
import { AuthRoute } from '../shared/components/routes/authRoute/authRoute.component';
import { AuthContextProvider } from '../modules/auth/auth.context';
import { AppComponent as App } from './app.component';
import { ROUTES } from './app.constants';
import { Login } from './matrix/login';
import { Personal } from './matrix/personal';
import { Knowledge } from './matrix/knowledge';
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
            <Route exact path={ROUTES.matrixLogin}>
              <Login />
            </Route>

            <AuthRoute exact path={ROUTES.matrixPersonal}>
              <Personal />
            </AuthRoute>

            <AuthRoute exact path={ROUTES.matrixKnowledge}>
              <Knowledge />
            </AuthRoute>
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
