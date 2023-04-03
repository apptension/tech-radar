import progressStep1 from '../../../../images/progress/progress-step1.png';
import progressStep2 from '../../../../images/progress/progress-step2.png';
import progressStep3 from '../../../../images/progress/progress-step3.png';
import progressStep4 from '../../../../images/progress/progress-step4.png';
import progressDone from '../../../../images/progress/progress-done.png';

import { assertUnreachable } from '../../../utils/assertUnreachable';
import { Step } from './formProgress.types';

export const getProgressImage = (step: Step) => {
  switch (step) {
    case 1:
      return progressStep1;
    case 2:
      return progressStep2;
    case 3:
      return progressStep3;
    case 4:
      return progressStep4;
    case 5:
      return progressDone;
    default:
      return assertUnreachable(step, 'Unhandled Progress step!');
  }
};
