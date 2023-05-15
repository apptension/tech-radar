import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setArea } from '../../../../../modules/filters/filters.actions';
import {
  closeTechnologyPopup,
  openTechnologyPopup,
} from '../../../../../modules/technologyPopup/technologyPopup.actions';
import { useContentfulData } from '../../../../hooks/useContentfulData/useContentfulData';

export const TechnologyPopupStep = () => {
  const dispatch = useDispatch();
  const { radarTechnologies, radarQuadrants } = useContentfulData();

  const reactTechnology = radarTechnologies.find((tech) => tech.label === 'React');
  const reactTechnologyQuadrant = radarQuadrants.find((quadrant) => quadrant.position === reactTechnology?.quadrant);

  useEffect(() => {
    if (!reactTechnologyQuadrant) return;
    setTimeout(() => {
      dispatch(setArea(reactTechnologyQuadrant.name));
      dispatch(openTechnologyPopup(reactTechnology?.id ?? ''));
    }, 0);
    return () => {
      setTimeout(() => {
        dispatch(setArea(''));
        dispatch(closeTechnologyPopup());
      }, 0);
    };
  }, []);

  return (
    <p>
      Technologies that work really well to solve real problems in projects. We've worked with them and they've proven
      to be effective. These technologies are slightly more risky. Some of our engineers walked this path and will share
      knowledge and experiences.
    </p>
  );
};
