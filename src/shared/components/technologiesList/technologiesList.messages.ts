import { defineMessages } from 'react-intl';

export default defineMessages({
  emptySearch: {
    id: 'technologiesList.emptySearch',
    defaultMessage:
      'We’re sorry, but we haven’t found any technology called “{searchText}”. Please try again and note that we don’t support searching by keyword, yet.',
  },
  emptyFiltering: {
    id: 'technologiesList.emptyFiltering',
    defaultMessage:
      'Ooops, looks like we don’t have any technologies that match ALL of your filters. Please try a different combination.',
  },
});
