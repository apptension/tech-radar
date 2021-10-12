// @ts-nocheck
import React, { PureComponent } from 'react';
import * as contentful from 'contentful';
import * as R from 'ramda';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

import { Radar } from '../../shared/components/radar';
import * as constants from './const';
import { Container } from './explore.styles';

export class Explore extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      client: null,
      content: null,
    };
  }

  componentDidMount() {
    const client = contentful.createClient({
      space: constants.SPACE_ID,
      accessToken: constants.ACCESS_TOKEN,
    });

    client
      .getEntries({ limit: 1000 })
      .then((response) => {
        this.setState({ content: response.items });
      })
      .catch(console.error);
  }

  getEntries(type = '') {
    if (type) {
      return R.pickBy((item) => R.pathOr('', ['sys', 'contentType', 'sys', 'id'], item) === type, this.state.content);
    }
    return {};
  }

  renderRingsDescription() {
    const contents = [];

    const entriesSorted = R.sortBy(
      (ring) => R.pathOr(0, ['fields', 'position'], ring),
      R.values(this.getEntries('ring'))
    );

    R.forEach((ring) => {
      contents.push(<dt>{ring.fields.label}</dt>);
      const html = documentToHtmlString(R.pathOr({}, ['fields', 'description'], ring));
      contents.push(<dd dangerouslySetInnerHTML={{ __html: html }} />);
    }, entriesSorted);

    return contents;
  }

  render() {
    return (
      <Container>
        <h3 className="container text-center">
          <span>Apptension Tech Radar</span>
        </h3>
        <Radar
          entries={this.getEntries('entry')}
          quadrants={this.getEntries('quadrant')}
          rings={this.getEntries('ring')}
        />
      </Container>
    );
  }
}
