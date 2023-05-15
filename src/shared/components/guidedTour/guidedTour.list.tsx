import { Placement, Step } from 'react-joyride';
import { AreasStep, InitialStep, SkillsStep, TeamsStep, TechnologyPopupStep } from './steps/';

export interface StepsList {
  INITIAL: 'initial';
  AREAS: 'areas';
  SKILLS: 'skills';
  TECHNOLOGY: 'technology';
}

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
  title: `🎉 You're using Tech Radar`,
  placement: 'center' as Placement,
  spotlightPadding: 0,
  disableBeacon: true,
  disableOverlayClose: true,
  content: <InitialStep />,
};

const skillsStep: Step = {
  target: '#quadrants',
  title: 'Check out our Skills',
  placement: 'right' as Placement,
  spotlightPadding: 0,
  disableBeacon: true,
  styles,
  content: <SkillsStep />,
};

const areasStep: Step = {
  target: '#quadrants',
  title: 'Check out Areas of our Technologies',
  placement: 'right' as Placement,
  spotlightPadding: 0,
  disableBeacon: true,
  styles,
  content: <AreasStep />,
};

const teamsStep: Step = {
  target: '#quadrants',
  title: 'Check out our Teams',
  placement: 'right' as Placement,
  spotlightPadding: 0,
  disableBeacon: true,
  styles,
  content: <TeamsStep />,
};

const technologyPopupStep: Step = {
  target: '.sidebar',
  title: 'Check out our Technologies',
  placement: 'auto' as Placement,
  spotlightPadding: 0,
  disableBeacon: true,
  styles,
  content: <TechnologyPopupStep />,
};

const stepsList = [initialStep, skillsStep, areasStep, teamsStep, technologyPopupStep];

export { stepsList };
