export type RadarEntry = { label: string; quadrant: number; ring: number; inactive: boolean };
export type RadarRing = { name: string; position: number };
export type RadarQuadrant = { name: string; position: number };

export type RadarConfig = {
  svg_id: string;
  width: number;
  height: number;
  colors: { background: string; grid: string; inactive: string; default: string };
  print_layout: true;
  quadrants: RadarQuadrant[];
  rings: RadarRing[];
  entries: RadarEntry[];
  zoomed_quadrant?: number;
  active_quadrant?: number;
};
