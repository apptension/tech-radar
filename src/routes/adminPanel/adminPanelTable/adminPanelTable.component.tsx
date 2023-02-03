import { useState } from 'react';
import { ExtendedRadarTechnology, TechnologyTable } from '../adminPanel.types';
import { Styles } from './adminPanelTable.styles';
import { Table } from './table.component';

interface AdminPanelTableProps {
  columns: TechnologyTable[];
  rows: ExtendedRadarTechnology[];
}

export const AdminPanelTable = ({ columns, rows }: AdminPanelTableProps) => {
  const [data, setData] = useState<ExtendedRadarTechnology[]>(() => rows);

  const updateMyData = (rowIndex: number, columnId: string, value: string | number | boolean) => {
    setData(() =>
      data.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...rows[rowIndex],
            [columnId]: value,
          };
        }
        return row;
      })
    );
  };

  const resetData = () => setData(rows);

  return (
    <Styles>
      <button onClick={resetData}>Reset data</button>
      <Table columns={columns} data={data} updateMyData={updateMyData} />
    </Styles>
  );
};
