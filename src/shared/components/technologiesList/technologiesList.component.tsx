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
import { TECHNOLOGY_RING } from './technologyList.types';

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

  const getTechnologyByRing = (ring: TECHNOLOGY_RING) => sortedActiveTechnologies.filter((tech) => tech.ring === ring);

  const sortedTechnologies = sortBy(compose(toLower, prop('label')), technologies);
  const sortedActiveTechnologies = sortedTechnologies.filter(({ inactive }) => inactive === false);

  const technologiesInUse = getTechnologyByRing(TECHNOLOGY_RING.IN_USE);
  const technologiesProven = getTechnologyByRing(TECHNOLOGY_RING.PROVEN);
  const technologiesPromising = getTechnologyByRing(TECHNOLOGY_RING.PROMISING);
  const technologiesPhasedOut = getTechnologyByRing(TECHNOLOGY_RING.PHASED_OUT);

  const technologiesList = [
    { title: intl.formatMessage(messages.inUseTitle), technologies: technologiesInUse, ring: TECHNOLOGY_RING.IN_USE },
    { title: intl.formatMessage(messages.provenTitle), technologies: technologiesProven, ring: TECHNOLOGY_RING.PROVEN },
    {
      title: intl.formatMessage(messages.promisingTitle),
      technologies: technologiesPromising,
      ring: TECHNOLOGY_RING.PROMISING,
    },
    {
      title: intl.formatMessage(messages.phasedOutTitle),
      technologies: technologiesPhasedOut,
      ring: TECHNOLOGY_RING.PHASED_OUT,
    },
  ];

  const sortedTechnologiesAmount = sortedTechnologies.filter(({ inactive }) => inactive === false).length;

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

        {technologiesList.map(({ ring, technologies, title }) => (
          <TechnologyGroup key={title} title={title} amount={technologies.length} infoContent={rings[ring].description}>
            {technologies.map((technology) => (
              <TechnologyListItem
                handleOpenPopup={handleOpenPopup}
                hasNoAreaSelected={hasNoAreaSelected}
                ringName={rings[technology.ring].name}
                key={`list-item-${technology.id}`}
                technology={technology}
              />
            ))}
          </TechnologyGroup>
        ))}
      </List>
      <ShadowTop visible={!scrollTopReached} />
      <ShadowBottom visible={!scrollBottomReached} />
    </ListWrapper>
  );
};
