import { Controller } from 'react-hook-form';
import { VALIDATION_MESSAGES } from '../../../utils/validationMessages';
import { ButtonSize, ButtonVariant } from '../../button/button.types';
import { MatrixSelectField } from '../../fields/matrixSelectField';
import { MatrixTextField } from '../../fields/matrixTextField';
import { Loader } from '../../loader';
import { Form, NextButton, FieldContainer } from './personalInfoForm.styles';
import { usePersonalInfoForm } from './usePersonalInfoForm.hook';

export const PersonalInfoForm = () => {
  const {
    form: {
      control,
      register,
      handleSubmit,
      formState: { errors },
    },
    seniorityOptions,
    positionOptions,
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
        <Controller
          control={control}
          name="position"
          rules={{ required: VALIDATION_MESSAGES.required }}
          render={({ field: { onChange, value, ref } }) => (
            <MatrixSelectField
              inputRef={ref}
              placeholder="Select your position"
              label="Position"
              isRequired
              options={positionOptions}
              error={errors.position?.message}
              value={positionOptions.find((option) => option.value === value)}
              onChange={(val: any) => onChange(val.value)}
            />
          )}
        />
      </FieldContainer>
      <FieldContainer>
        <Controller
          control={control}
          name="seniority"
          rules={{ required: VALIDATION_MESSAGES.required }}
          render={({ field: { onChange, value, ref } }) => (
            <MatrixSelectField
              inputRef={ref}
              placeholder="Select your seniority level"
              label="Seniority level"
              isRequired
              options={seniorityOptions}
              error={errors.seniority?.message}
              value={seniorityOptions.find((option) => option.value === value)}
              onChange={(val: any) => onChange(val.value)}
            />
          )}
        />
      </FieldContainer>
      <NextButton type="submit" size={ButtonSize.LARGE} variant={ButtonVariant.PRIMARY}>
        Next
      </NextButton>
    </Form>
  );
};
