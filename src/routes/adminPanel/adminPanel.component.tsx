import { CustomDataGrid } from '../../shared/components/customDataGrid';
import { technologiesColumnsDef } from './adminPanel.consts';

export const AdminPanel = () => {
  return <CustomDataGrid columns={technologiesColumnsDef} rows={[]} />;
};
