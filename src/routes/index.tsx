import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { IntlProvider } from 'react-intl';

import { DEFAULT_LOCALE, translationMessages } from '../i18n';
import { asyncComponent } from '../shared/utils/asyncComponent';
import { AppComponent as App } from './app.component';
import { ROUTES } from './app.constants';
import { Login } from './login';
import { NewEntry } from './newEntry';
//<-- IMPORT ROUTE -->

// @ts-ignore
const Home = asyncComponent(() => import('./home'), 'Home');
// @ts-ignore
const Explore = asyncComponent(() => import('./explore'), 'Explore');
// @ts-ignore
const NotFound = asyncComponent(() => import('./notFound'), 'NotFound');
// @ts-ignore
const AdminPanel = asyncComponent(() => import('./adminPanel'), 'AdminPanel');

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

          <Route exact path={ROUTES.adminPanel}>
            <AdminPanel />
          </Route>

          <Route exact path={ROUTES.login}>
            <Login />
          </Route>

          <Route exact path={ROUTES.newEntry}>
            <NewEntry />
          </Route>

          {/* <-- INJECT ROUTE --> */}

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
