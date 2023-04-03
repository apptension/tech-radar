import { Button } from '../../button';
import { ButtonSize, ButtonVariant } from '../../button/button.types';
import { ActionsContainer, NextButton } from './formActions.styles';

interface WithoutBackButtonProps {
  withoutBackButton: true;
}

interface WithBackButtonProps {
  withoutBackButton?: false;
  handleGoBack: () => void;
}

interface CommonProps {
  isEditMode?: boolean;
  isDisabled?: boolean;
  isLoading?: boolean;
  nextLabel?: string;
}

type FormActionsProps = (WithBackButtonProps | WithoutBackButtonProps) & CommonProps;

export const FormActions = ({
  isEditMode = false,
  isLoading = false,
  nextLabel = 'Next',
  isDisabled = false,
  ...props
}: FormActionsProps) => {
  return (
    <ActionsContainer>
      {!props.withoutBackButton && (
        <Button type="button" onClick={props.handleGoBack} size={ButtonSize.LARGE}>
          {isEditMode ? 'Cancel' : 'Back'}
        </Button>
      )}
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
