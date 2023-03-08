import { VALIDATION_MESSAGES } from '../../../utils/validationMessages';
import { ButtonSize, ButtonVariant } from '../../button/button.types';
import { MatrixTextField } from '../../fields/matrixTextField';
import { Loader } from '../../loader';
import { Form, NextButton, FieldContainer } from './personalInfoForm.styles';
import { usePersonalInfoForm } from './usePersonalInfoForm.hook';

export const PersonalInfoForm = () => {
  const {
    form: {
      register,
      handleSubmit,
      formState: { errors },
    },
    isLoading,
    submit,
  } = usePersonalInfoForm();

  if (isLoading) {
    return <Loader isFullPage />;
  }

  return (
    <Form onSubmit={handleSubmit(submit)}>
      <FieldContainer>
        <MatrixTextField
          label="Your name and surname"
          error={errors.name?.message}
          {...register('name', { required: VALIDATION_MESSAGES.required })}
          isRequired
        />
      </FieldContainer>
      <FieldContainer>
        <MatrixTextField
          label="Email"
          error={errors.email?.message}
          {...register('email', { required: VALIDATION_MESSAGES.required })}
          isDisabled
        />
      </FieldContainer>
      <FieldContainer>
        <MatrixTextField
          label="Slack Member ID"
          error={errors.slackId?.message}
          {...register('slackId')}
          infoContent='To find your Slack Member ID, please, go to the Profile details in Slack, use "more" icon and select "Copy member ID".'
        />
      </FieldContainer>
      <FieldContainer>
        <MatrixTextField
          label="Position"
          error={errors.position?.message}
          {...register('position', { required: VALIDATION_MESSAGES.required })}
          isRequired
        />
      </FieldContainer>
      <NextButton type="submit" size={ButtonSize.LARGE} variant={ButtonVariant.PRIMARY}>
        Next
      </NextButton>
    </Form>
  );
};
