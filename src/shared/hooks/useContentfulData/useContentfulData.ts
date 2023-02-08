import { useQuery } from 'react-query';
import { pathOr, pickBy } from 'ramda';
import axios from 'axios';
import { client, cmaURL, contentfulConfig } from '../../services/api/contentful';
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

export const getEntries =
  (content: ContentfulData | undefined) =>
  (type = '') => {
    if (type && content) {
      return pickBy((item) => pathOr('', ['sys', 'contentType', 'sys', 'id'], item) === type, content);
    }

    return {};
  };

export const useLastContentfulUpdate = () => {
  const config = {
    headers: {
      Authorization: `Bearer ${contentfulConfig.contentManagementToken}`,
    },
  };

  const dateQuery = useQuery(
    ['lastUpdate'],
    async () => {
      try {
        const {
          data: {
            sys: { updatedAt },
          },
        } = await axios.get(cmaURL, config);

        return updatedAt;
      } catch (error) {
        reportError(error);
      }
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  return dateQuery.dataUpdatedAt;
};

export const useContentfulData = () => {
  const contentfulQuery = useQuery(
    ['explore'],
    async (): Promise<ContentfulData | undefined> => {
      try {
        const { items } = await client.getEntries({ limit: 1000 });
        console.log('🚀 ~ file: useContentfulData.ts:61 ~ items', items);

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
  console.log('🚀 ~ file: useContentfulData.ts:74 ~ useContentfulData ~ technologies', technologies);
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
