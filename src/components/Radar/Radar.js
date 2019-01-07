import React, { PureComponent } from 'react';
import * as R from 'ramda';
import _sortBy from 'lodash/sortBy';

import techRadar from "../../lib/zalando-tech-radar";
import './Radar.css';


class Radar extends PureComponent {
  componentDidUpdate(prevProps) {
    this.renderRadar();
  }

  getRadarEntries = () => {
    const radarEntries = [];
    R.forEachObjIndexed(
      item => radarEntries.push({
        label: R.pathOr('', ['fields', 'label'], item),
        quadrant: this.getEntryQuadrant(item),
        ring: R.pathOr(1, ['fields', 'ring', 'fields', 'position'], item) - 1,
        moved: R.pathOr(0, ['fields', 'moved'], item),
      }),
      this.props.entries,
    );
    return radarEntries;
  };

  getEntryQuadrant = (entry) => {
    const position = R.pathOr('', ['fields', 'quadrant', 'fields', 'position'], entry);
    return this.getQuadrantPosition(position);
  };

  getRadarRings = () => {
    const radarRings = [];
    R.forEachObjIndexed(
      item => radarRings.push({
        name:R.pathOr('', ['fields', 'label'], item),
        color:R.pathOr('#000000', ['fields', 'color'], item),
        position:R.pathOr(1, ['fields', 'position'], item),
      }),
      this.props.rings
    );
    return _sortBy(radarRings, ['position']);
  };

  getQuadrantPosition = (position) => {
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

  getRadarQuadrants = () => {
    const radarQuadrants = [];
    R.forEachObjIndexed(
      item => radarQuadrants.push({
        name: R.pathOr('', ['fields', 'label'], item),
        position: this.getQuadrantPosition(R.pathOr(0, ['fields', 'position'], item)),
      }),
      this.props.quadrants,
    );
    return _sortBy(radarQuadrants, ['position']);
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
