import { ButtonSize, ButtonVariant } from '../../button/button.types';
import { MatrixTextField } from '../../fields/matrixTextField';
import { Form, NextButton, FieldContainer } from './personalInfoForm.styles';

export const PersonalInfoForm = () => {
  return (
    <Form>
      <FieldContainer>
        <MatrixTextField label="Your name and surname" isRequired />
      </FieldContainer>
      <FieldContainer>
        <MatrixTextField label="Email" />
      </FieldContainer>
      <FieldContainer>
        <MatrixTextField label="Slack Member ID" />
      </FieldContainer>
      <FieldContainer>
        <MatrixTextField label="Position" isRequired />
      </FieldContainer>
      <NextButton size={ButtonSize.LARGE} variant={ButtonVariant.PRIMARY}>
        Next
      </NextButton>
    </Form>
  );
};
