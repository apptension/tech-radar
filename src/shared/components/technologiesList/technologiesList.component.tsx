import { useState, UIEvent } from 'react';
import { sortBy, prop, toLower, compose, isEmpty } from 'ramda';

import { useDispatch, useSelector } from 'react-redux';
import { FormattedMessage, useIntl } from 'react-intl';
import { RadarRing, RadarTechnology } from '../radar/radar.types';
import { selectSearch } from '../../../modules/filters/filters.selectors';
import { TechnologyId } from '../../../modules/technologyPopup/technologyPopup.types';
import { openTechnologyPopup } from '../../../modules/technologyPopup/technologyPopup.actions';
import { ListWrapper, List, EmptyResults, ShadowTop, ShadowBottom, ResultsTextInfo } from './technologiesList.styles';
import messages from './technologiesList.messages';
import { TechnologyGroup } from './technologyGroup';
import { TechnologyListItem } from './technologyListItem';

interface TechnologiesListProps {
  technologies: RadarTechnology[];
  emptyResults: { search: boolean; filters: boolean };
  rings: RadarRing[];
  hasNoAreaSelected: boolean;
}

export const TechnologiesList = ({ technologies, emptyResults, rings, hasNoAreaSelected }: TechnologiesListProps) => {
  const intl = useIntl();
  const searchText = useSelector(selectSearch);
  const [scrollTopReached, setScrollTopReached] = useState(true);
  const [scrollBottomReached, setScrollBottomReached] = useState(false);
  const dispatch = useDispatch();
  const handleOpenPopup = (technologyId: TechnologyId) => dispatch(openTechnologyPopup(technologyId));

  const sortedTechnologies = sortBy(compose(toLower, prop('label')), technologies);

  const technologiesInUse = sortedTechnologies.filter(({ ring, inactive }) => ring === 0 && inactive === false);
  const technologiesProven = sortedTechnologies.filter(({ ring, inactive }) => ring === 1 && inactive === false);
  const technologiesPromising = sortedTechnologies.filter(({ ring, inactive }) => ring === 2 && inactive === false);
  const technologiesPhasedOut = sortedTechnologies.filter(({ ring, inactive }) => ring === 3 && inactive === false);
  const sortedTechnologiesAmount = sortedTechnologies.filter(({ inactive }) => inactive === false).length;

  const listItemProps = { handleOpenPopup, hasNoAreaSelected, rings };

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    const scrollBottom = scrollHeight - clientHeight;
    setScrollTopReached(scrollTop === 0);
    setScrollBottomReached(scrollTop >= scrollBottom);
  };

  if (emptyResults.search) {
    return (
      <EmptyResults>
        <FormattedMessage {...messages.emptySearch} values={{ searchText }} />
      </EmptyResults>
    );
  }

  if (emptyResults.filters || isEmpty(sortedTechnologies)) {
    return (
      <EmptyResults>
        <FormattedMessage {...messages.emptyFiltering} />
      </EmptyResults>
    );
  }

  return (
    <ListWrapper>
      <List onScroll={handleScroll}>
        {searchText ? (
          <ResultsTextInfo>
            <FormattedMessage {...messages.results} />({sortedTechnologiesAmount})
          </ResultsTextInfo>
        ) : (
          <ResultsTextInfo>
            <FormattedMessage {...messages.allSkills} />
          </ResultsTextInfo>
        )}
        <TechnologyGroup title={intl.formatMessage(messages.inUseTitle)} amount={technologiesInUse.length}>
          {technologiesInUse.map((technology) => (
            <TechnologyListItem {...listItemProps} key={`list-item-${technology.id}`} technology={technology} />
          ))}
        </TechnologyGroup>
        <TechnologyGroup title={intl.formatMessage(messages.provenTitle)} amount={technologiesProven.length}>
          {technologiesProven.map((technology) => (
            <TechnologyListItem {...listItemProps} key={`list-item-${technology.id}`} technology={technology} />
          ))}
        </TechnologyGroup>

        <TechnologyGroup title={intl.formatMessage(messages.promisingTitle)} amount={technologiesPromising.length}>
          {technologiesPromising.map((technology) => (
            <TechnologyListItem {...listItemProps} key={`list-item-${technology.id}`} technology={technology} />
          ))}
        </TechnologyGroup>

        <TechnologyGroup title={intl.formatMessage(messages.phasedOutTitle)} amount={technologiesPhasedOut.length}>
          {technologiesPhasedOut.map((technology) => (
            <TechnologyListItem {...listItemProps} key={`list-item-${technology.id}`} technology={technology} />
          ))}
        </TechnologyGroup>
      </List>
      <ShadowTop visible={!scrollTopReached} />
      <ShadowBottom visible={!scrollBottomReached} />
    </ListWrapper>
  );
};
