import React, { PureComponent } from 'react';
import * as contentful from "contentful";
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import _get from "lodash/get";
import _pickBy from "lodash/pickBy";
import _forEach from "lodash/forEach";
import _sortBy from "lodash/sortBy";

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

    client.getEntries()
      .then((response) => {
        this.setState({content: response.items});
      })
      .catch(console.error);
  };

  getEntries(type = '') {
    if (type) {
      return _pickBy(this.state.content, item => _get(item, 'sys.contentType.sys.id', '') === type);
    }
    return {};
  }

  renderRingsDescription() {
    const contents = [];
    const entriesSorted = _sortBy(
      this.getEntries('ring'), ring => _get(ring, 'fields.position', 0)
    );

    _forEach(entriesSorted, ring => {
      contents.push(<dt>{ring.fields.label}</dt>);
      const html = documentToHtmlString(_get(ring, 'fields.description', {}));
      contents.push(<dd dangerouslySetInnerHTML={{__html: html }} />);
    });

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
