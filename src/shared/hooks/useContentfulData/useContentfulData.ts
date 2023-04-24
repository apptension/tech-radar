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
  ContentfulProject,
} from '../../components/radar/radar.types';
import {
  getRadarQuadrants,
  getRadarRings,
  getRadarTeams,
  getRadarTechnologies,
  getRadarTechnologiesForTable,
  getRadarProjects,
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
  const { data: teamsData } = useQuery(
    ['teams'],
    async () => {
      try {
        const { items } = await client.getEntries({ content_type: 'team' });
        return items as ContentfulTeam[];
      } catch (error) {
        reportError(error);
      }
    },
    { refetchOnWindowFocus: false }
  );

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
    { refetchOnWindowFocus: false }
  );

  const selectData = getEntries(contentfulQuery.data);
  const technologies = selectData('entry') as ContentfulTechnology[];
  const quadrants = selectData('quadrant') as ContentfulQuadrant[];
  const rings = selectData('ring') as ContentfulRing[];
  const projects = selectData('project') as ContentfulProject[];

  const radarTechnologies = getRadarTechnologies(technologies);
  const tableRadarTechnologies = getRadarTechnologiesForTable(technologies);
  const radarQuadrants = getRadarQuadrants(quadrants);
  const radarRings = getRadarRings(rings);
  const radarTeams = getRadarTeams(teamsData);
  const radarProjects = getRadarProjects(projects);

  return {
    contentfulQuery,
    radarTechnologies,
    radarQuadrants,
    radarRings,
    radarTeams,
    radarProjects,
    tableRadarTechnologies,
  };
};
