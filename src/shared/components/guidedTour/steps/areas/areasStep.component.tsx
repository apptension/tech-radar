import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Tag } from '../../components/tag/tag.component';
import { TagsWrapper } from '../../components/tag/tag.styles';
import { setArea, setLevel } from '../../../../../modules/filters/filters.actions';
import { useContentfulData } from '../../../../hooks/useContentfulData/useContentfulData';
import { QuadrantPositions } from '../../../radar/radar.types';
import { highlightBlips, unHighlightBlips } from '../utils';

export const AreasStep = () => {
  const [activeTag, setActiveTag] = useState('');
  const { radarTechnologies, radarQuadrants } = useContentfulData();
  const dispatch = useDispatch();

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
    setTimeout(() => {
      handleQuadrantClick(defaultQuadrant.name, defaultQuadrant.position);
    }, 0);
    return () => {
      unHighlightBlips(radarTechnologies);
      setTimeout(() => {
        dispatch(setLevel(null));
        dispatch(setArea(null));
      }, 0);
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
