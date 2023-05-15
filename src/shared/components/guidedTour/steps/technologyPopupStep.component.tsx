import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useIntl } from 'react-intl';
import { setArea } from '../../../../modules/filters/filters.actions';
import { closeTechnologyPopup, openTechnologyPopup } from '../../../../modules/technologyPopup/technologyPopup.actions';
import { useContentfulData } from '../../../hooks/useContentfulData/useContentfulData';
import messages from '../guidedTour.messages';

export const TechnologyPopupStep = () => {
  const intl = useIntl();
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

  return <p>{intl.formatMessage(messages.technologyPopupStepDescription)}</p>;
};
