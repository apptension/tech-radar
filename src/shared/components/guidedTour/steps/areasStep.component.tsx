import { useState, useEffect } from 'react';
import { Tag } from '../components/tag/tag.component';
import { TagsWrapper } from '../components/tag/tag.styles';
import { setArea, setLevel } from '../../../../modules/filters/filters.actions';
import { useContentfulData } from '../../../hooks/useContentfulData/useContentfulData';
import { QuadrantPositions } from '../../radar/radar.types';
import { useStepDispatch } from '../useStepDispatch.hook';
import { highlightBlips, unHighlightBlips } from './utils';

export const AreasStep = () => {
  const [activeTag, setActiveTag] = useState('');
  const { radarTechnologies, radarQuadrants } = useContentfulData();
  const dispatch = useStepDispatch();

  const defaultQuadrant = radarQuadrants[0];
  const currentQuadrant = radarQuadrants.find((quadrant) => quadrant.name === activeTag);

  const handleQuadrantClick = (value: string, position: QuadrantPositions) => {
    if (activeTag === value) return;
    unHighlightBlips(radarTechnologies);
    const technologiesToHighlight = radarTechnologies.filter((tech) => tech.quadrant === position);
    highlightBlips(technologiesToHighlight);
    setActiveTag(value);
    dispatch(setArea(value));
  };

  useEffect(() => {
    handleQuadrantClick(defaultQuadrant.name, defaultQuadrant.position);
    return () => {
      unHighlightBlips(radarTechnologies);
      dispatch(setLevel(null));
      dispatch(setArea(null));
    };
  }, []);

  return (
    <div>
      <TagsWrapper>
        {radarQuadrants.map((quadrant) => (
          <Tag
            key={quadrant.position}
            activeTag={activeTag}
            onClick={(value) => handleQuadrantClick(value, quadrant.position)}
            value={quadrant.name}
          />
        ))}
      </TagsWrapper>
      <p>{currentQuadrant?.description}</p>
    </div>
  );
};
