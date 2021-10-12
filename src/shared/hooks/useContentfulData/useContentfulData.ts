import { useQuery } from 'react-query';
import { pathOr, pickBy } from 'ramda';
import { Entry } from 'contentful';
import { client } from '../../services/api/contentful';
import { reportError } from '../../utils/reportError';

export const getEntries =
  (content: Entry<unknown>[] | undefined) =>
  (type = '') => {
    if (type && content) {
      return pickBy((item) => pathOr('', ['sys', 'contentType', 'sys', 'id'], item) === type, content);
    }

    return {};
  };

export const useContentfulData = () => {
  const contentfulQuery = useQuery(
    ['explore'],
    async () => {
      try {
        const { items } = await client.getEntries({ limit: 1000 });

        return items;
      } catch (error) {
        reportError(error);
      }
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  const selectData = getEntries(contentfulQuery.data);
  const technologies = selectData('entry');
  const quadrants = selectData('quadrant');
  const rings = selectData('ring');

  return {
    contentfulQuery,
    technologies,
    quadrants,
    rings,
  };
};
