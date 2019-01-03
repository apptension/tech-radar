radar_visualization({
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
    { name: "Data Management" },
  ],
  rings: [
    { name: "Adopt", color: "#93c47d" },
    { name: "Trial", color: "#93d2c2" },
    { name: "Assess", color: "#fbdb84" },
    { name: "Hold", color: "#efafa9" },
  ],
  print_layout: true,
  // zoomed_quadrant: 0,
  //ENTRIES
  entries: [
    {
      quadrant: 0,
      ring: 0,
      label: "Lorem ipsum",
    },
  ]
  //ENTRIES
});
