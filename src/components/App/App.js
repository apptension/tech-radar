import React, { PureComponent } from 'react';
import * as contentful from "contentful";
import _get from "lodash/get";
import _pickBy from "lodash/pickBy";

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

  render() {
    console.log(this.getEntries('ring'));
    return (
      <div className="App mt-4">
        <h3 className="container text-center">
          <img className="logo" src="https://apptension.com/07e0b4851db757109a23b11dba931a4d.svg" />
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
        </div>
      </div>
    );
  }
}

export default App;
