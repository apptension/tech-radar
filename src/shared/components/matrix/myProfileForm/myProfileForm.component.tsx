import { Controller } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { useHistory } from 'react-router-dom';
import { ROUTES } from '../../../../routes/app.constants';
import { VALIDATION_MESSAGES } from '../../../utils/validationMessages';
import { Button } from '../../button';
import { ButtonSize, ButtonVariant, ButtonIcon } from '../../button/button.types';
import { MatrixSelectField } from '../../fields/matrixSelectField';
import { MatrixTextField } from '../../fields/matrixTextField';
import { Loader } from '../../loader';
import { FormActions } from '../formActions';
import { FieldContainer, Form } from '../personalInfoForm/personalInfoForm.styles';
import myProfileFormMessages from './myProfileForm.messages';
import { ButtonsContainer } from './myProfileForm.styles';
import { useMyProfileForm } from './useMyProfileForm.hook';

export const MyProfileForm = () => {
  const history = useHistory();
  const intl = useIntl();

  const {
    form: {
      control,
      register,
      handleSubmit,
      formState: { errors, isDirty },
    },
    positionOptions,
    seniorityOptions,
    isLoading,
    isSubmitting,
    submit,
  } = useMyProfileForm();

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
      <ButtonsContainer>
        <FormActions
          withoutBackButton
          nextLabel={intl.formatMessage(myProfileFormMessages.saveLabel)}
          isDisabled={!isDirty}
          isLoading={isSubmitting}
        />
        <Button
          size={ButtonSize.LARGE}
          variant={ButtonVariant.PRIMARY}
          type="button"
          disabled={isSubmitting}
          onClick={() => history.push(ROUTES.matrix)}
          icon={ButtonIcon.ARROW}
        >
          {intl.formatMessage(myProfileFormMessages.goToMatrix)}
        </Button>
      </ButtonsContainer>
    </Form>
  );
};
