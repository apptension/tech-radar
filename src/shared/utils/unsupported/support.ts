import { DEFAULT_LOCALE, translationMessages } from '../../../i18n';

//eslint-disable-next-line import/first
import UnsupportedBrowserDetection from './unsupportedBrowserDetection';
import { unsupportedPageContent } from './unsupportedPage/unsupportedPage';

require('es5-shim');
require('es5-shim/es5-sham');
require('./unsupportedPage/unsupportedPage.css');
//eslint-disable-next-line import/first
//eslint-disable-next-line import/first

const detection = new UnsupportedBrowserDetection();

export const setUnsupportedClasses = () => {
  document.documentElement.className += ` device-${detection.deviceType}`;

  if (detection.isInAppBrowser) {
    document.documentElement.className += ' in-app-browser';
  }

  if (!detection.isSupported()) {
    document.documentElement.className += ' unsupported';
    const unsupportedPageElement = document.querySelector<HTMLElement>('.unsupported-page');
    const appElement = document.querySelector<HTMLElement>('#app');

    if (unsupportedPageElement && appElement) {
      unsupportedPageElement.style.display = 'block';
      appElement.style.display = 'none';
      document.title = 'Unsupported Browser';
      unsupportedPageElement.innerHTML = unsupportedPageContent;
    }
  }
};
