// @ts-nocheck
import React, { useState, useEffect } from 'react';
import * as R from 'ramda';

import { Radar } from '../../shared/components/radar';
import { client } from '../../shared/services/api/contentful';
import { Container } from './explore.styles';

export const Explore = () => {
  const [content, setContent] = useState(null);

  useEffect(() => {
    client
      .getEntries({ limit: 1000 })
      .then((response) => {
        setContent(response.items);
      })
      .catch(console.error);
  }, []);

  const getEntries = (type = '') => {
    if (type) {
      return R.pickBy((item) => R.pathOr('', ['sys', 'contentType', 'sys', 'id'], item) === type, content);
    }
    return {};
  };

  return (
    <Container>
      <Radar entries={getEntries('entry')} quadrants={getEntries('quadrant')} rings={getEntries('ring')} />
    </Container>
  );
};
