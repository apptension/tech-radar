import { Component } from 'react';
import PropTypes from 'prop-types';
import * as Sentry from '@sentry/browser';

export default class SentryBoundary extends Component {
  static propTypes = {
    children: PropTypes.any.isRequired,
  };

  componentDidCatch(error, errorInfo) {
    Sentry.withScope(scope => {
      Object.keys(errorInfo).forEach(key => {
        scope.setExtra(key, errorInfo[key]);
      });
      Sentry.captureException(error);
    });
  }

  render() {
    return this.props.children;
  }
}
