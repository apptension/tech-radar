import { Button } from '../../button';
import { ButtonSize, ButtonVariant } from '../../button/button.types';
import { ActionsContainer, NextButton } from './formActions.styles';

interface FormActionsProps {
  handleGoBack: () => void;
  isEditMode?: boolean;
  isDisabled?: boolean;
  isLoading?: boolean;
  nextLabel?: string;
}

export const FormActions = ({
  isEditMode = false,
  isLoading = false,
  nextLabel = 'Next',
  isDisabled = false,
  handleGoBack,
}: FormActionsProps) => {
  return (
    <ActionsContainer>
      <Button type="button" onClick={handleGoBack} size={ButtonSize.LARGE}>
        {isEditMode ? 'Cancel' : 'Back'}
      </Button>
      <NextButton
        type="submit"
        isLoading={isLoading}
        size={ButtonSize.LARGE}
        variant={ButtonVariant.PRIMARY}
        disabled={isDisabled}
      >
        {isEditMode ? 'Save' : nextLabel}
      </NextButton>
    </ActionsContainer>
  );
};
