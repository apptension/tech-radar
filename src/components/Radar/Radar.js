import React, { PureComponent } from 'react';
import _forEach from 'lodash/forEach';
import _get from 'lodash/get';

import techRadar from "../../lib/zalando-tech-radar";
import './Radar.css';


class Radar extends PureComponent {
  componentDidUpdate(prevProps) {
    this.renderRadar();
  }

  getRadarEntries = () => {
    const radarEntries = [];
    _forEach(this.props.entries, item => radarEntries.push({
      label:_get(item, 'fields.label', ''),
      quadrant: this.getEntryQuadrant(item),
      ring: _get(item, 'fields.ring.fields.position', 1) - 1,
      moved: _get(item, 'fields.moved', 0),
    }));
    return radarEntries;
  };

  getEntryQuadrant = (entry) => {
    const position = _get(entry, 'fields.quadrant.fields.position', '');
    if (position) {
      switch (position) {
        case 'bottom-right':
          return 0;
        case 'bottom-left':
          return 1;
        case 'top-left':
          return 2;
        case 'top-right':
          return 3;
        default:
          return 0;
      }
    }
    return 0;
  };

  getRadarRings = () => {
    const radarRings = [];
    _forEach(this.props.rings, item => radarRings.push({
      name:_get(item, 'fields.label', ''),
      color:_get(item, 'fields.color', '#000000'),
    }));
    return radarRings;
  };

  getRadarQuadrants = () => {
    const radarQuadrants = [];
    _forEach(this.props.quadrants, item => radarQuadrants.push({
      name:_get(item, 'fields.label', ''),
    }));
    return radarQuadrants;
  };

  renderRadar() {
    return techRadar({
      svg_id: "radar",
      width: 1450,
      height: 1000,
      colors: {
        background: "#fff",
        grid: "#bbb",
        inactive: "#ddd"
      },
      quadrants: this.getRadarQuadrants(),
      rings: this.getRadarRings(),
      print_layout: true,
      // zoomed_quadrant: 0,
      //ENTRIES
      entries: this.getRadarEntries(),
    });
  }

  render() {
    return (
      <div className="radar-container text-center">
        <svg id="radar" />
      </div>
    );
  }
}

export default Radar;
