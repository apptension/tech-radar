import { useHistory } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { useContentfulData } from '../../shared/hooks/useContentfulData/useContentfulData';
import { AdminPanelTable } from '../../shared/components/adminPanelTable';
import { ROUTES } from '../app.constants';
import { useTechnologiesColumns } from './useTechnologiesColumns';
import messages from './adminPanel.messages';

export const AdminPanel = () => {
  const token = sessionStorage.getItem('accessToken');
  const history = useHistory();
  const intl = useIntl();

  if (!token) history.push(ROUTES.login);

  const { radarTeams, radarQuadrants, radarRings, tableRadarTechnologies } = useContentfulData();
  const technologiesColumns = useTechnologiesColumns({
    radarTeams,
    radarQuadrants,
    radarRings,
  });

  if (tableRadarTechnologies.length === 0) return <p>{intl.formatMessage(messages.dataNotFound)}</p>;

  return <AdminPanelTable columns={technologiesColumns} rows={tableRadarTechnologies} />;
};
