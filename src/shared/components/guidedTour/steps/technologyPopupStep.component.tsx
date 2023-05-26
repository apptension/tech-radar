import { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { setArea } from '../../../../modules/filters/filters.actions';
import { closeTechnologyPopup, openTechnologyPopup } from '../../../../modules/technologyPopup/technologyPopup.actions';
import { useContentfulData } from '../../../hooks/useContentfulData/useContentfulData';
import messages from '../guidedTour.messages';
import { useStepDispatch } from '../useStepDispatch.hook';

export const TechnologyPopupStep = () => {
  const intl = useIntl();
  const dispatch = useStepDispatch();
  const { radarTechnologies, radarQuadrants } = useContentfulData();

  const reactTechnology = radarTechnologies.find((tech) => tech.label === 'React');
  const reactTechnologyQuadrant = radarQuadrants.find((quadrant) => quadrant.position === reactTechnology?.quadrant);

  useEffect(() => {
    if (!reactTechnologyQuadrant) return;
    dispatch(setArea(reactTechnologyQuadrant.name));
    dispatch(openTechnologyPopup(reactTechnology?.id ?? ''));
    return () => {
      dispatch(setArea(''));
      dispatch(closeTechnologyPopup());
    };
  }, []);

  return <p>{intl.formatMessage(messages.technologyPopupStepDescription)}</p>;
};
