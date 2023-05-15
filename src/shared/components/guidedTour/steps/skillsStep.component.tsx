import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setLevel } from '../../../../modules/filters/filters.actions';
import { useContentfulData } from '../../../hooks/useContentfulData/useContentfulData';
import { Tag } from '../components/tag/tag.component';
import { TagsWrapper } from '../components/tag/tag.styles';
import { highlightBlips, unHighlightBlips } from './utils';

export const SkillsStep = () => {
  const [activeRing, setActiveRing] = useState('');
  const dispatch = useDispatch();
  const { radarTechnologies, radarRings } = useContentfulData();

  const currentSkill = radarRings.find((ring) => ring.name === activeRing);

  const handleTagClick = (value: string) => {
    if (activeRing === value) return;
    const currentRingTechnologies = radarTechnologies.filter((tech) => tech.ringLabel === value);

    unHighlightBlips(radarTechnologies);
    highlightBlips(currentRingTechnologies);
    setActiveRing(value);
    dispatch(setLevel(value));
  };

  useEffect(() => {
    setTimeout(() => {
      handleTagClick(radarRings[0]?.name);
    }, 0);
    return () => {
      unHighlightBlips(radarTechnologies);
      setTimeout(() => {
        dispatch(setLevel(null));
      }, 0);
    };
  }, []);

  return (
    <div>
      <TagsWrapper>
        {radarRings.map((skill) => (
          <Tag key={skill.id} activeTag={activeRing} value={skill.name} onClick={handleTagClick} />
        ))}
      </TagsWrapper>
      <p>{currentSkill?.description}</p>
    </div>
  );
};
