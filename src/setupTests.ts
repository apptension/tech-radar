import 'core-js/stable';
import 'regenerator-runtime/runtime';
import '@testing-library/jest-dom/extend-expect';
import 'isomorphic-fetch';
import 'jest-styled-components';
import axios from 'axios';
import MockDate from 'mockdate';

import './mocks/reactIntl';

axios.defaults.adapter = require('axios/lib/adapters/http');

MockDate.set('2020-11-22');

jest.disableAutomock();

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: Function.prototype,
      removeListener: Function.prototype,
    };
  };
