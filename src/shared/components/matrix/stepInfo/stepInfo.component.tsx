import { ComponentProps } from 'react';
import { FormProgress } from '../formProgress';
import {
  FinalStepHeader,
  FinalStepProgressContainer,
  FinalStepTitle,
  FormProgressWrapper,
  Header,
  InfoText,
  Title,
  TitleContainer,
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
        <InfoText limitedWidth={isFinalStep}>{content}</InfoText>
      </FinalStepHeader>
    );
  }

  return (
    <Header>
      <FormProgressWrapper>
        <FormProgress step={step} />
      </FormProgressWrapper>

      <TitleContainer>
        <Title>{title}</Title>
        <InfoText>{content}</InfoText>
      </TitleContainer>
    </Header>
  );
};
