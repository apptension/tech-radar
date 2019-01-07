import React, { PureComponent } from 'react';
import * as contentful from "contentful";
import * as R from 'ramda';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

import Radar from '../Radar/Radar'
import * as constants from '../const';
import './App.css';


class App extends PureComponent {
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
      accessToken: constants.ACCESS_TOKEN
    });

    client.getEntries( { limit: 1000 })
      .then((response) => {
        this.setState({content: response.items});
      })
      .catch(console.error);
  };

  getEntries(type = '') {
    if (type) {
      return R.pickBy(
        item => R.pathOr('', ['sys', 'contentType', 'sys', 'id'], item) === type,
        this.state.content,
      );
    }
    return {};
  }

  renderRingsDescription() {
    const contents = [];

    const entriesSorted = R.sortBy(
      ring => R.pathOr(0, ['fields', 'position'], ring),
      R.values(this.getEntries('ring')),
    );

    R.forEach(
      ring => {
        contents.push(<dt>{ring.fields.label}</dt>);
        const html = documentToHtmlString(R.pathOr({}, ['fields', 'description'], ring));
        contents.push(<dd dangerouslySetInnerHTML={{__html: html }} />);
      },
      entriesSorted
    );

    return contents;
  }

  render() {
    return (
      <div className="App mt-4">
        <h3 className="container text-center">
          <img className="logo" src="https://apptension.com/07e0b4851db757109a23b11dba931a4d.svg" alt="" />
          <span>Apptension Tech Radar</span>
        </h3>
        <Radar
          entries={this.getEntries('entry')}
          quadrants={this.getEntries('quadrant')}
          rings={this.getEntries('ring')}
        />
        <div className="container text-justify">
          <h3>What is the Tech Radar?</h3>
          <p>Tech Radar is a list of technologies, complemented by an assessment result, called ring assignment. We use four rings with the following semantics:</p>
          <dl className="mb-5">
            {this.renderRingsDescription()}
          </dl>
        </div>
      </div>
    );
  }
}

export default App;
