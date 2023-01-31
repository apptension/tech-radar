import DataGrid from 'react-data-grid';
import { TechnologiesColumns } from '../../../routes/adminPanel/adminPanel.consts';

interface DataGridProps {
  columns: Array<TechnologiesColumns>;
  rows: Array<any>;
}

export const CustomDataGrid = ({ columns, rows }: DataGridProps) => {
  return <DataGrid columns={columns} rows={rows} />;
};
