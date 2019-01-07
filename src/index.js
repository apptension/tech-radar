import React from 'react';
import ReactDOM from 'react-dom';
import * as Sentry from '@sentry/browser';
import App from './components/App/App';
import SentryBoundary from './components/SentryBoundary/SentryBoundary'

Sentry.init({
  dsn: 'https://17d18613939842c68f849c2e75b08e4f@sentry.io/1364549',
  environment: process.env.REACT_APP_SENTRY_ENVIRONMENT,
});

ReactDOM.render(
  <SentryBoundary>
    <App />
  </SentryBoundary>,
  document.getElementById('root'),
);
