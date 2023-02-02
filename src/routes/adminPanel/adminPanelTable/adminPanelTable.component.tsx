import { useEffect, useState } from 'react';
import { ExtendedRadarTechnology, TechnologyTable } from '../adminPanel.types';
import { Styles } from './adminPanelTable.styles';
import { Table } from './table.component';

interface AdminPanelTableProps {
  columns: TechnologyTable[];
  rows: ExtendedRadarTechnology[];
}

export const AdminPanelTable = ({ columns, rows }: AdminPanelTableProps) => {
  const [data, setData] = useState<ExtendedRadarTechnology[]>([]);
  const [skipPageReset, setSkipPageReset] = useState(false);

  useEffect(() => {
    setData(rows);
  }, [rows]);

  useEffect(() => {
    setSkipPageReset(false);
  }, [data]);

  const updateMyData = (rowIndex: number, columnId: string, value: string | number) => {
    setSkipPageReset(true);
    setData(() =>
      rows.map((row, index) => {
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

  if (data.length === 0) return <p>Data not found...</p>;

  return (
    <Styles>
      <button onClick={resetData}>Reset data</button>
      <Table columns={columns} data={data} updateMyData={updateMyData} skipPageReset={skipPageReset} />
    </Styles>
  );
};
