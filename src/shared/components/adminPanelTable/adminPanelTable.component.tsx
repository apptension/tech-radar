import { useState } from 'react';
import { ExtendedRadarTechnology, TechnologyTable } from '../../../routes/adminPanel/adminPanel.types';
import { Table } from '../table';
import { Styles } from './adminPanelTable.styles';

interface AdminPanelTableProps {
  columns: TechnologyTable[];
  rows: ExtendedRadarTechnology[];
}

export const AdminPanelTable = ({ columns, rows }: AdminPanelTableProps) => {
  const [data, setData] = useState<ExtendedRadarTechnology[]>(rows);

  const updateMyData = (rowIndex: number, columnId: string, value: string | number | boolean) => {
    setData((prevState) =>
      prevState.map((row, index) => {
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
