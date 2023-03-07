import { ButtonSize, ButtonVariant } from '../../button/button.types';
import { MatrixTextField } from '../../fields/matrixTextField';
import { Form, NextButton, FieldContainer } from './personalInfoForm.styles';
import { usePersonalInfoForm } from './usePersonalInfoForm.hook';

export const PersonalInfoForm = () => {
  const {
    form: { register },
  } = usePersonalInfoForm();

  return (
    <Form>
      <FieldContainer>
        <MatrixTextField label="Your name and surname" {...register('name')} isRequired />
      </FieldContainer>
      <FieldContainer>
        <MatrixTextField label="Email" {...register('email')} isDisabled />
      </FieldContainer>
      <FieldContainer>
        <MatrixTextField label="Slack Member ID" {...register('slackId')} />
      </FieldContainer>
      <FieldContainer>
        <MatrixTextField label="Position" {...register('position')} isRequired />
      </FieldContainer>
      <NextButton size={ButtonSize.LARGE} variant={ButtonVariant.PRIMARY}>
        Next
      </NextButton>
    </Form>
  );
};
