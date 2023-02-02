import React, { useEffect, useState } from 'react';
import { ExtendedRadarTechnology, TechnologyTable } from '../adminPanel.types';
import { Styles } from './adminPanelTable.styles';
import { Table } from './table.component';

interface AdminPanelTableProps {
  columns: TechnologyTable[];
  rows: ExtendedRadarTechnology[];
}

export const AdminPanelTable = ({ columns, rows }: AdminPanelTableProps) => {
  const [data, setData] = useState(() => rows);
  const [skipPageReset, setSkipPageReset] = useState(false);

  const updateMyData = (rowIndex: number, columnId: number, value: number) => {
    setSkipPageReset(true);
    setData((old) =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value,
          };
        }
        return row;
      })
    );
  };

  useEffect(() => {
    setSkipPageReset(false);
  }, [data]);

  const resetData = () => setData(rows);

  return (
    <Styles>
      <button onClick={resetData}>Reset data</button>
      <Table columns={columns} data={rows} updateMyData={updateMyData} skipPageReset={skipPageReset} />
    </Styles>
  );
};
