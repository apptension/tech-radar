import { useState } from 'react';
import { useHistory } from 'react-router';
import { ExtendedRadarTechnology, TechnologyTable } from '../../../routes/adminPanel/adminPanel.types';
import { signOutFromAdminPanel } from '../../../routes/adminPanel/auth/firebase';
import { Table } from '../table';
import { Styles } from './adminPanelTable.styles';

interface AdminPanelTableProps {
  columns: TechnologyTable[];
  rows: ExtendedRadarTechnology[];
}

export const AdminPanelTable = ({ columns, rows }: AdminPanelTableProps) => {
  const [data, setData] = useState<ExtendedRadarTechnology[]>(rows);
  const history = useHistory();

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