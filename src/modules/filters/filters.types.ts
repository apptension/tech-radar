export interface FiltersState {
  area: FilterType;
  level: FilterType;
  team: FilterType;
  search: FilterType;
}

export type FilterType = string | null;
