import { useQuery } from 'react-query';
import { pathOr, pickBy } from 'ramda';
import { client } from '../../services/api/contentful';
import { reportError } from '../../utils/reportError';
import {
  ContentfulQuadrant,
  ContentfulRing,
  ContentfulTechnology,
  ContentfulData,
  ContentfulTeam,
} from '../../components/radar/radar.types';
import {
  getRadarQuadrants,
  getRadarRings,
  getRadarTeams,
  getRadarTechnologies,
  getRadarTechnologiesForTable,
} from '../../utils/radarUtils';
import { getLastUpdate } from '../../services/api/endpoints/contentful';

export const getEntries =
  (content: ContentfulData | undefined) =>
  (type = '') => {
    if (type && content) {
      return pickBy((item) => pathOr('', ['sys', 'contentType', 'sys', 'id'], item) === type, content);
    }

    return {};
  };

export const useLastContentfulUpdate = () => {
  const { dataUpdatedAt } = useQuery(['lastUpdate'], getLastUpdate, {
    refetchOnWindowFocus: false,
  });
  return dataUpdatedAt;
};

export const useContentfulData = () => {
  const contentfulQuery = useQuery(
    ['explore'],
    async (): Promise<ContentfulData | undefined> => {
      try {
        const { items } = await client.getEntries({ limit: 1000 });

        return items as ContentfulData;
      } catch (error) {
        reportError(error);
      }
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  const selectData = getEntries(contentfulQuery.data);
  const technologies = selectData('entry') as ContentfulTechnology[];
  const quadrants = selectData('quadrant') as ContentfulQuadrant[];
  const rings = selectData('ring') as ContentfulRing[];
  const teams = selectData('team') as ContentfulTeam[];

  const radarTechnologies = getRadarTechnologies(technologies);
  const tableRadarTechnologies = getRadarTechnologiesForTable(technologies);
  const radarQuadrants = getRadarQuadrants(quadrants);
  const radarRings = getRadarRings(rings);
  const radarTeams = getRadarTeams(teams);

  return {
    contentfulQuery,
    radarTechnologies,
    radarQuadrants,
    radarRings,
    radarTeams,
    tableRadarTechnologies,
  };
};
