import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Tag } from '../../components/tag/tag.component';
import { TagsWrapper } from '../../components/tag/tag.styles';
import { setArea, setLevel } from '../../../../../modules/filters/filters.actions';
import { useContentfulData } from '../../../../hooks/useContentfulData/useContentfulData';
import { QuadrantPositions } from '../../../radar/radar.types';
import { highlightBlips, unHighlightBlips } from '../utils';

const quadrants = [
  { name: 'Packages & Libraries', position: QuadrantPositions.topRight },
  { name: 'Products & Tools', position: QuadrantPositions.bottomRight },
  { name: 'Infrastructure', position: QuadrantPositions.bottomLeft },
  { name: 'Languages & Frameworks', position: QuadrantPositions.topLeft },
];

const defaultQuadrant = quadrants[0];

export const AreasStep = () => {
  const [activeTag, setActiveTag] = useState('');
  const { radarTechnologies } = useContentfulData();
  const dispatch = useDispatch();

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
        {quadrants.map((quadrant) => (
          <Tag
            key={quadrant.position}
            activeTag={activeTag}
            onClick={(value) => handleQuadrantClick(value, quadrant.position)}
            value={quadrant.name}
          />
        ))}
      </TagsWrapper>
      <p>
        The radar will let you explore all of the technologies, methods, and tools used here at Apptension and learn
        more about them. You will also get to see the technologies we have on our radar (pun intended) and, hopefully,
        get inspired.
      </p>
    </div>
  );
};
