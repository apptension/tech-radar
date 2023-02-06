import { useState } from 'react';
import { useHistory } from 'react-router';
import { ExtendedRadarTechnology, TechnologyTable } from '../adminPanel.types';
import { signOutFromAdminPanel } from '../auth/firebase';
import { Styles } from './adminPanelTable.styles';
import { Table } from './table.component';

interface AdminPanelTableProps {
  columns: TechnologyTable[];
  rows: ExtendedRadarTechnology[];
}

export const AdminPanelTable = ({ columns, rows }: AdminPanelTableProps) => {
  const [data, setData] = useState<ExtendedRadarTechnology[]>(() => rows);
  const history = useHistory();

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

  const handleSignOut = () => {
    signOutFromAdminPanel(history);
  };

  const resetData = () => setData(rows);

  return (
    <Styles>
      <button onClick={handleSignOut}> Sign Out </button>
      <button onClick={resetData}>Reset data</button>
      <Table columns={columns} data={data} updateMyData={updateMyData} />
    </Styles>
  );
};
