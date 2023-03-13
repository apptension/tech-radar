import { ProgressImage } from './formProgress.styles';
import { Step } from './formProgress.types';
import { getProgressImage } from './formProgress.utils';

interface FormProgressProps {
  step: Step;
}

export const FormProgress = ({ step }: FormProgressProps) => {
  const progress = getProgressImage(step);

  return <ProgressImage src={progress} alt={`progress bar step ${step}`} />;
};
