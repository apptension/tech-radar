import React, { Fragment, ReactNode } from 'react';
import '../theme/styled.d';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { FormattedMessage, IntlProvider } from 'react-intl';

import { DEFAULT_LOCALE, translationMessages } from '../i18n';
import { GlobalStyle } from '../theme/global';
import { ResponsiveThemeProvider } from '../shared/components/responsiveThemeProvider';
import { ToastRenderer } from '../shared/components/toast';
import { useStartup } from './useStartup';

export interface AppComponentProps {
  children?: ReactNode;
}

export const AppComponent = ({ children }: AppComponentProps) => {
  useStartup();

  const language = DEFAULT_LOCALE;

  if (!language) {
    return null;
  }

  return (
    <IntlProvider key={language} locale={language} messages={translationMessages[language]}>
      <HelmetProvider>
        <Fragment>
          <FormattedMessage defaultMessage="Apptension Tech Radar" description="App / Page title">
            {([pageTitle]: [string]) => <Helmet titleTemplate={`%s - ${pageTitle}`} defaultTitle={pageTitle} />}
          </FormattedMessage>

          <GlobalStyle />
          <ResponsiveThemeProvider>{React.Children.only(children)}</ResponsiveThemeProvider>
          <ToastRenderer />
        </Fragment>
      </HelmetProvider>
    </IntlProvider>
  );
};
