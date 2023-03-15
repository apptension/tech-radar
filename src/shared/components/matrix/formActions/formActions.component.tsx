import { Button } from '../../button';
import { ButtonSize, ButtonVariant } from '../../button/button.types';
import { ActionsContainer, NextButton } from './formActions.styles';

interface FormActionsProps {
  handleGoBack: () => void;
  backLabel?: string;
  nextLabel?: string;
}

export const FormActions = ({ backLabel = 'Back', nextLabel = 'Next', handleGoBack }: FormActionsProps) => {
  return (
    <ActionsContainer>
      <Button type="button" onClick={handleGoBack} size={ButtonSize.LARGE}>
        {backLabel}
      </Button>
      <NextButton type="submit" size={ButtonSize.LARGE} variant={ButtonVariant.PRIMARY}>
        {nextLabel}
      </NextButton>
    </ActionsContainer>
  );
};
