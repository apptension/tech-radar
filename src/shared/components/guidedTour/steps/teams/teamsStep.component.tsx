import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setTeam } from '../../../../../modules/filters/filters.actions';
import { useContentfulData } from '../../../../hooks/useContentfulData/useContentfulData';
import { Tag } from '../../components/tag/tag.component';
import { TagsWrapper } from '../../components/tag/tag.styles';
import { highlightBlips, unHighlightBlips } from '../utils';

const teams = ['Frontend', 'Backend + DevOps', 'PM', 'QA', 'Design'];

export const TeamsStep = () => {
  const [activeTeam, setActiveTeam] = useState('');
  const dispatch = useDispatch();
  const { radarTechnologies } = useContentfulData();

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
      handleTagClick(teams[0]);
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
        {teams.map((skill) => (
          <Tag key={skill} activeTag={activeTeam} value={skill} onClick={handleTagClick} />
        ))}
      </TagsWrapper>
      <p>
        Technologies that work really well to solve real problems in projects. We've worked with them and they've proven
        to be effective. These technologies are slightly more risky. Some of our engineers walked this path and will
        share knowledge and experiences. Specification | Github We believe that it is a Promising technology 70% of our
        Frontend team has experience working with this technology 6 projects were done by Apptension using Angular
      </p>
    </div>
  );
};
