import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useIntl } from 'react-intl';
import { setTeam } from '../../../../../modules/filters/filters.actions';
import { useContentfulData } from '../../../../hooks/useContentfulData/useContentfulData';
import { Tag } from '../../components/tag/tag.component';
import { TagsWrapper } from '../../components/tag/tag.styles';
import { highlightBlips, unHighlightBlips } from '../utils';
import messages from '../../guidedTour.messages';

export const TeamsStep = () => {
  const [activeTeam, setActiveTeam] = useState('');
  const intl = useIntl();
  const dispatch = useDispatch();
  const { radarTechnologies, radarTeams } = useContentfulData();

  const handleTagClick = (value: string) => {
    if (activeTeam === value) return;
    const currentTeamTechnologies = radarTechnologies.filter((tech) => tech.teams.includes(value));

    unHighlightBlips(radarTechnologies);
    highlightBlips(currentTeamTechnologies);
    setActiveTeam(value);
    dispatch(setTeam(value));
  };

  useEffect(() => {
    setTimeout(() => {
      handleTagClick(radarTeams[0]?.name);
    }, 0);
    return () => {
      unHighlightBlips(radarTechnologies);
      setTimeout(() => {
        dispatch(setTeam(null));
      }, 0);
    };
  }, []);

  return (
    <div>
      <TagsWrapper>
        {radarTeams.map((team) => (
          <Tag key={team?.id} activeTag={activeTeam} value={team?.name} onClick={handleTagClick} />
        ))}
      </TagsWrapper>
      <p>{intl.formatMessage(messages.teamsStepDescription)}</p>
    </div>
  );
};
