import { assertUnreachable } from '../../../utils/assertUnreachable';
import { Step } from '../formProgress/formProgress.types';

export const getStepTitle = (step: Step) => {
  switch (step) {
    case 1:
      return 'Step 1: Personal information';
    case 2:
      return 'Step 2: Knowledge expertise';
    case 3:
      return 'Step 3: Additional information';
    case 4:
      return 'Step 4: Overview';
    case 5:
      return 'Your Skills Matrix is ready!';
    default:
      return assertUnreachable(step, 'Unhandled StepTitle step!');
  }
};

export const getStepContent = (step: Step) => {
  switch (step) {
    case 1:
      return 'Please, make sure your personal data is correct.\nIt will be used for internal purpose only.';
    case 2:
      return 'We want to make Apptension a great place to contribute your experience and to enhance your skills!\nPlease, share your vision on expert knowledge that you currently have. Just grab the tag and move to the level 😉';
    case 3:
      return "Couldn't find some skills in our list?\nOr maybe there's something you would like to learn?\nLet us know and we'll see how we can help!";
    case 4:
      return "Please, check information you've added.\nIs there anything you would like to change?";
    case 5:
      return 'We deeply appreciate your contribution to this!\n\nIf you want to know what technologies we are currently working with or, conversely, think they are not as valuable to Apptension, visit the link below.\nWe hope it can get you inspired!';
    default:
      return assertUnreachable(step, 'Unhandled StepContent step!');
  }
};
