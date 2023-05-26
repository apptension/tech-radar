import { useEffect, useState } from 'react';
import { setTeam } from '../../../../modules/filters/filters.actions';
import { useContentfulData } from '../../../hooks/useContentfulData/useContentfulData';
import { Tag } from '../components/tag/tag.component';
import { TagsWrapper } from '../components/tag/tag.styles';
import { useStepDispatch } from '../useStepDispatch.hook';
import { highlightBlips, unHighlightBlips } from './utils';

export const TeamsStep = () => {
  const [activeTeam, setActiveTeam] = useState('');
  const dispatch = useStepDispatch();
  const { radarTechnologies, radarTeams } = useContentfulData();

  const currentTeam = radarTeams.find((team) => team.name === activeTeam);

  const handleTagClick = (value: string) => {
    if (activeTeam === value) return;
    const currentTeamTechnologies = radarTechnologies.filter((tech) => tech.teams.includes(value));

    unHighlightBlips(radarTechnologies);
    highlightBlips(currentTeamTechnologies);
    setActiveTeam(value);
    dispatch(setTeam(value));
  };

  useEffect(() => {
    handleTagClick(radarTeams[0]?.name);
    return () => {
      unHighlightBlips(radarTechnologies);
      dispatch(setTeam(null));
    };
  }, []);

  return (
    <div style={{ width: 538 }}>
      <TagsWrapper>
        {radarTeams.map((team) => (
          <Tag key={team?.id} activeTag={activeTeam} value={team?.name} onClick={handleTagClick} />
        ))}
      </TagsWrapper>
      <p>{currentTeam?.description}</p>
    </div>
  );
};
