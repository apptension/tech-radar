import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setLevel } from '../../../../../modules/filters/filters.actions';
import { useContentfulData } from '../../../../hooks/useContentfulData/useContentfulData';
import { Tag } from '../../components/tag/tag.component';
import { TagsWrapper } from '../../components/tag/tag.styles';
import { highlightBlips, unHighlightBlips } from '../utils';

const skills = ['In use', 'Proven', 'Promising', 'Phased out'];

export const SkillsStep = () => {
  const [activeRing, setActiveRing] = useState('');
  const dispatch = useDispatch();
  const { radarTechnologies } = useContentfulData();

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
      handleTagClick(skills[0]);
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
        {skills.map((skill) => (
          <Tag key={skill} activeTag={activeRing} value={skill} onClick={handleTagClick} />
        ))}
      </TagsWrapper>
      <p>
        Here we show the technologies we have a lot of confidence in at Apptension. Technologies with a usage culture in
        our production environment, low risk and recommended to be widely used.{' '}
      </p>
    </div>
  );
};
