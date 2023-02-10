import { useState } from 'react';
import { useHistory } from 'react-router';
import { TechnologyTable } from '../../../routes/adminPanel/adminPanel.types';
import { signOutFromAdminPanel } from '../../../routes/adminPanel/auth/firebase';
import { ROUTES } from '../../../routes/app.constants';
import { TableRadarTechnology } from '../radar/radar.types';
import { Table } from '../table';
import { Styles } from './adminPanelTable.styles';

interface AdminPanelTableProps {
  columns: TechnologyTable[];
  rows: TableRadarTechnology[];
}

export const AdminPanelTable = ({ columns, rows }: AdminPanelTableProps) => {
  const [data, setData] = useState<TableRadarTechnology[]>(rows);
  const history = useHistory();

  const updateMyData = (rowIndex: number, columnId: string, value: string | number | boolean) =>
    setData((prevState) => prevState.map((row, index) => (index === rowIndex ? { ...row, [columnId]: value } : row)));

  const handleSignOut = () => signOutFromAdminPanel(history);
  const resetData = () => setData(rows);
  const goToNewEntryPage = () => history.push(ROUTES.newEntry);

  return (
    <Styles>
      <button onClick={handleSignOut}> Sign Out </button>
      <button onClick={resetData}> Reset data </button>
      <button onClick={goToNewEntryPage}> Add new entry </button>
      <Table columns={columns} data={data} updateMyData={updateMyData} />
    </Styles>
  );
};
