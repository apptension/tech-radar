// @ts-nocheck
import React, { FC, useState, useEffect } from 'react';
import * as contentful from 'contentful';
import * as R from 'ramda';

import { Radar } from '../../shared/components/radar';
import * as constants from './const';
import { Container } from './explore.styles';

export const Explore: FC = () => {
  const [content, setContent] = useState(null);

  useEffect(() => {
    const client = contentful.createClient({
      space: constants.SPACE_ID,
      accessToken: constants.ACCESS_TOKEN,
    });

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
