import { useHistory } from 'react-router-dom';
import { useContentfulData } from '../../shared/hooks/useContentfulData/useContentfulData';
import { AdminPanelTable } from '../../shared/components/adminPanelTable';
import { ROUTES } from '../app.constants';
import { createTechnologiesColumns } from '../../shared/components/adminPanelTable/adminPanelTable.config';

export const AdminPanel = () => {
  const token = sessionStorage.getItem('accessToken');
  const history = useHistory();

  if (!token) history.push(ROUTES.login);

  const { radarTechnologies, radarTeams, radarQuadrants, radarRings, tableRadarTechnologies } = useContentfulData();
  const technologiesColumns = createTechnologiesColumns({ radarTechnologies, radarTeams, radarQuadrants, radarRings });

  if (tableRadarTechnologies.length === 0) return <p>Data not found...</p>;

  return <AdminPanelTable columns={technologiesColumns} rows={tableRadarTechnologies} />;
};
