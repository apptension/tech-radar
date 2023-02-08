export type TechnologyColumn = {
  Header: string;
  accessor: string;
  Cell?: ((row: any) => JSX.Element) | undefined;
};

export type TechnologyTable = {
  Header: string;
  columns: TechnologyColumn[];
};

export type AlternativesTableType = {
  description: string;
  icon: {
    description: string;
    name: string;
    url: string;
  };
  id: string;
  lable: string;
};
