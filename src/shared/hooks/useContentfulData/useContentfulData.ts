import { useQuery } from 'react-query';
import { pathOr, pickBy } from 'ramda';
import { client } from '../../services/api/contentful';
import { reportError } from '../../utils/reportError';
import {
  ContentfulQuadrant,
  ContentfulRing,
  ContentfulTechnology,
  ContentfulData,
} from '../../components/radar/radar.types';

export const getEntries =
  (content: ContentfulData | undefined) =>
  (type = '') => {
    if (type && content) {
      return pickBy((item) => pathOr('', ['sys', 'contentType', 'sys', 'id'], item) === type, content);
    }

    return {};
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

  return {
    contentfulQuery,
    technologies,
    quadrants,
    rings,
  };
};
