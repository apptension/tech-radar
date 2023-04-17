import { Controller } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { VALIDATION_MESSAGES } from '../../../utils/validationMessages';
import { ButtonSize, ButtonVariant } from '../../button/button.types';
import { MatrixSelectField } from '../../fields/matrixSelectField';
import { MatrixTextField } from '../../fields/matrixTextField';
import { Loader } from '../../loader';
import myProfileFormMessages from '../myProfileForm/myProfileForm.messages';
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
  const intl = useIntl();

  if (isLoading) {
    return <Loader isFullPage />;
  }

  return (
    <Form onSubmit={handleSubmit(submit)}>
      <FieldContainer>
        <MatrixTextField
          label={intl.formatMessage(myProfileFormMessages.nameAndSurnameLabel)}
          error={errors.name?.message}
          {...register('name', { required: VALIDATION_MESSAGES.required })}
          isRequired
        />
      </FieldContainer>
      <FieldContainer>
        <MatrixTextField
          label={intl.formatMessage(myProfileFormMessages.emailLabel)}
          error={errors.email?.message}
          {...register('email', { required: VALIDATION_MESSAGES.required })}
          isDisabled
        />
      </FieldContainer>
      <FieldContainer>
        <MatrixTextField
          label={intl.formatMessage(myProfileFormMessages.slackId)}
          error={errors.slackId?.message}
          {...register('slackId')}
          infoContent={intl.formatMessage(myProfileFormMessages.slackIdInfo)}
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
              placeholder={intl.formatMessage(myProfileFormMessages.positionPlaceholder)}
              label={intl.formatMessage(myProfileFormMessages.positionLabel)}
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
              placeholder={intl.formatMessage(myProfileFormMessages.seniorityPlaceholder)}
              label={intl.formatMessage(myProfileFormMessages.seniorityLabel)}
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
        {intl.formatMessage({ id: 'personalInfoForm.next', defaultMessage: 'Next' })}
      </NextButton>
    </Form>
  );
};
