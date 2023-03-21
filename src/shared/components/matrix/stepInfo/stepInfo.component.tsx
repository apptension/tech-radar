import { ComponentProps } from 'react';
import { FormProgress } from '../formProgress';
import { TitleHeader } from '../titleHeader';
import {
  FinalStepHeader,
  FinalStepProgressContainer,
  FinalStepTitle,
  FormProgressWrapper,
  Header,
  HeaderInfoText,
} from './stepInfo.styles';
import { getStepContent, getStepTitle } from './stepInfo.utils';

interface StepInfoProps {
  step: ComponentProps<typeof FormProgress>['step'];
}

export const StepInfo = ({ step }: StepInfoProps) => {
  const title = getStepTitle(step);
  const content = getStepContent(step);
  const isFinalStep = step === 5;

  if (isFinalStep) {
    return (
      <FinalStepHeader>
        <FinalStepProgressContainer>
          <FormProgressWrapper>
            <FormProgress step={step} />
          </FormProgressWrapper>
          <FinalStepTitle>{title}</FinalStepTitle>
        </FinalStepProgressContainer>
        <HeaderInfoText limitedWidth={isFinalStep}>{content}</HeaderInfoText>
      </FinalStepHeader>
    );
  }

  return (
    <Header>
      <FormProgressWrapper>
        <FormProgress step={step} />
      </FormProgressWrapper>

      <TitleHeader title={title} content={content} />
    </Header>
  );
};
