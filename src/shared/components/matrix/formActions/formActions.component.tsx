import { useIntl } from 'react-intl';
import { Button } from '../../button';
import { ButtonSize, ButtonVariant } from '../../button/button.types';
import { ActionsContainer, NextButton } from './formActions.styles';
import formActionsMessages from './formActions.messages';

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
  nextLabel,
  isDisabled = false,
  ...props
}: FormActionsProps) => {
  const intl = useIntl();
  const nextStr = nextLabel ? nextLabel : intl.formatMessage(formActionsMessages.next);

  return (
    <ActionsContainer>
      {!props.withoutBackButton && (
        <Button type="button" onClick={props.handleGoBack} size={ButtonSize.LARGE}>
          {isEditMode ? intl.formatMessage(formActionsMessages.cancel) : intl.formatMessage(formActionsMessages.back)}
        </Button>
      )}
      <NextButton
        type="submit"
        isLoading={isLoading}
        size={ButtonSize.LARGE}
        variant={ButtonVariant.PRIMARY}
        disabled={isDisabled}
      >
        {isEditMode ? intl.formatMessage(formActionsMessages.save) : nextStr}
      </NextButton>
    </ActionsContainer>
  );
};
