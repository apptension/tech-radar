export type TechnologyColumn = {
  Header: string;
  accessor: string;
  Cell?: ((row: any) => JSX.Element) | undefined;
};

export type TechnologyTable = {
  Header: string;
  columns: TechnologyColumn[];
};
