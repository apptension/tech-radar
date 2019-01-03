import techRadar from './lib/zalando-tech-radar';
import * as contentful from 'contentful';
import _get from 'lodash/get';
import './main.css';


const SPACE_ID = 's3uxq74ufqso';
const ACCESS_TOKEN = 'dbe9d6b6a3c213616c5701857c30d2c6cebcfd813998231db8040857b2af850e';

const client = contentful.createClient({
  space: SPACE_ID,
  accessToken: ACCESS_TOKEN
});

function getQuadrantId(quadrantName = '') {
  if (quadrantName) {
    switch (quadrantName) {
      case 'bottom-right':
        return 0;
      case 'bottom-left':
        return 1;
      case 'top-left':
        return 2;
      case 'top-right':
        return 3;
    }
  }
  return 0;
}

function getRingId(ringName = '') {
  if (ringName) {
    switch (ringName) {
      case '1. Adapt':
        return 0;
      case '2. Trial':
        return 1;
      case '3. Assess':
        return 2;
      case '4. Hold':
        return 3;
    }
  }
  return 0;
}

function getMovedId(movedName = '') {
  if (movedName) {
    switch (movedName) {
      case 'Not moved':
        return 0;
      case 'Moved out':
        return -1;
      case 'Moved in':
        return 1;
    }
  }
  return 0;
}

function renderRadar(entries) {
  return techRadar({
    svg_id: "radar",
    width: 1450,
    height: 1000,
    colors: {
      background: "#fff",
      grid: "#bbb",
      inactive: "#ddd"
    },
    title: "Apptension Tech Radar",
    quadrants: [
      { name: "Languages" },
      { name: "Infrastructure" },
      { name: "Frameworks" },
      { name: "Data Management" }
    ],
    rings: [
      { name: "ADOPT", color: "#93c47d" },
      { name: "TRIAL", color: "#93d2c2" },
      { name: "ASSESS", color: "#fbdb84" },
      { name: "HOLD", color: "#efafa9" }
    ],
    print_layout: true,
    // zoomed_quadrant: 0,
    //ENTRIES
    entries,
  });
}


client.getEntries({ content_type: 'entry' })
  .then((response) => {
    const radarEntries = [];
    response.items.forEach(item => radarEntries.push({
        label: _get(item, 'fields.label', ''),
        quadrant: getQuadrantId(_get(item, 'fields.quadrant')),
        ring: getRingId(_get(item, 'fields.ring', '')),
        moved: getMovedId(_get(item, 'fields.moved', '')),
    }));
    renderRadar(radarEntries);
  })
  .catch(console.error);


