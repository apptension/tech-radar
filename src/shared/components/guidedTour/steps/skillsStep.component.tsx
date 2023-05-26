import { useEffect, useState } from 'react';
import { setLevel } from '../../../../modules/filters/filters.actions';
import { useContentfulData } from '../../../hooks/useContentfulData/useContentfulData';
import { Tag } from '../components/tag/tag.component';
import { TagsWrapper } from '../components/tag/tag.styles';
import { useStepDispatch } from '../useStepDispatch.hook';
import { highlightBlips, unHighlightBlips } from './utils';

export const SkillsStep = () => {
  const [activeRing, setActiveRing] = useState('');
  const dispatch = useStepDispatch();
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
    handleTagClick(radarRings[0]?.name);
    return () => {
      unHighlightBlips(radarTechnologies);
      dispatch(setLevel(null));
    };
  }, []);

  return (
    <div style={{ width: 422 }}>
      <TagsWrapper>
        {radarRings.map((skill) => (
          <Tag key={skill.id} activeTag={activeRing} value={skill.name} onClick={handleTagClick} />
        ))}
      </TagsWrapper>
      <p>{currentSkill?.description}</p>
    </div>
  );
};
