import { useState } from 'react';
import { useIntl } from 'react-intl';
import { useHistory } from 'react-router';
import { TechnologyTable } from '../../../../routes/admin/adminPanel/adminPanel.types';
import { ROUTES } from '../../../../routes/app.constants';
import { TableRadarTechnology } from '../../radar/radar.types';
import { Table } from '../../table';
import { useAdminPanelContext } from '../adminPanelContext';
import adminPanelTableMessages from './adminPanelTable.messages';
import { Styles } from './adminPanelTable.styles';

interface AdminPanelTableProps {
  columns: TechnologyTable[];
  rows: TableRadarTechnology[];
}

export const AdminPanelTable = ({ columns, rows }: AdminPanelTableProps) => {
  const { logout } = useAdminPanelContext();
  const history = useHistory();
  const intl = useIntl();

  const [data, setData] = useState<TableRadarTechnology[]>(rows);

  const updateMyData = (rowIndex: number, columnId: string, value: string | number | boolean) =>
    setData((prevState) => prevState.map((row, index) => (index === rowIndex ? { ...row, [columnId]: value } : row)));

  const resetData = () => setData(rows);
  const goToNewEntryPage = () => history.push(ROUTES.adminNewEntry);

  return (
    <Styles>
      <button onClick={logout}>{intl.formatMessage(adminPanelTableMessages.signOut)} </button>
      <button onClick={resetData}>{intl.formatMessage(adminPanelTableMessages.resetData)} </button>
      <button onClick={goToNewEntryPage}> {intl.formatMessage(adminPanelTableMessages.addNewEntry)} </button>
      <Table columns={columns} data={data} updateMyData={updateMyData} />
    </Styles>
  );
};
