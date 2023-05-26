import { FormattedMessage } from 'react-intl';
import { Placement, Step } from 'react-joyride';
import { AreasStep, InitialStep, SkillsStep, TeamsStep, TechnologyPopupStep } from './steps/';
import messages from './guidedTour.messages';

const styles = {
  spotlight: {
    background: 'transparent',
  },
  overlay: {
    background: 'rgba(0, 0, 0, 0.2)',
  },
};

const initialStep: Step = {
  target: '#app',
  title: <FormattedMessage {...messages.initialStepTitle} />,
  placement: 'center' as Placement,
  spotlightPadding: 0,
  disableBeacon: true,
  disableOverlayClose: true,
  content: <InitialStep />,
};

const skillsStep: Step = {
  target: '#quadrants',
  title: <FormattedMessage {...messages.skillsStepTitle} />,
  placement: 'right' as Placement,
  spotlightPadding: 0,
  disableBeacon: true,
  styles,
  content: <SkillsStep />,
};

const areasStep: Step = {
  target: '#quadrants',
  title: <FormattedMessage {...messages.areasStepTitle} />,
  placement: 'right' as Placement,
  spotlightPadding: 0,
  disableBeacon: true,
  styles,
  content: <AreasStep />,
};

const teamsStep: Step = {
  target: '#quadrants',
  title: <FormattedMessage {...messages.teamsStepTitle} />,
  placement: 'right' as Placement,
  spotlightPadding: 0,
  disableBeacon: true,
  styles,
  content: <TeamsStep />,
};

const technologyPopupStep: Step = {
  target: '.sidebar',
  title: <FormattedMessage {...messages.technologyPopupStepTitle} />,
  placement: 'auto' as Placement,
  spotlightPadding: 0,
  disableBeacon: true,
  styles,
  content: <TechnologyPopupStep />,
};

const stepsList = [initialStep, skillsStep, areasStep, teamsStep, technologyPopupStep];

export { stepsList };
