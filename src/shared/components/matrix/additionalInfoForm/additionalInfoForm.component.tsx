import { useIntl } from 'react-intl';
import { FormActions } from '../formActions';
import { Form, StyledValueBox, Textarea, TextAreasContainer } from './additionalInfoForm.styles';
import { useAdditionalInfoForm } from './useAdditionalInfoForm.hook';
import additionalInfoMessages from './additionalInfoForm.messages';

export const AdditionalInfoForm = () => {
  const { form, isEditMode, isDisabled, submit, goBack, cancelEdit } = useAdditionalInfoForm();
  const intl = useIntl();
  const { handleSubmit, register } = form;

  return (
    <Form onSubmit={handleSubmit(submit)}>
      <TextAreasContainer>
        <StyledValueBox
          maxContentHeight="190px"
          label={intl.formatMessage(additionalInfoMessages.skills)}
          infoContent={intl.formatMessage(additionalInfoMessages.skillsInfo)}
        >
          <Textarea {...register('additionalSkills')} />
        </StyledValueBox>

        <StyledValueBox
          maxContentHeight="190px"
          label={intl.formatMessage(additionalInfoMessages.likeToLearn)}
          infoContent={intl.formatMessage(additionalInfoMessages.likeToLearnInfo)}
        >
          <Textarea {...register('likeToLearn')} />
        </StyledValueBox>
      </TextAreasContainer>

      <FormActions handleGoBack={isEditMode ? cancelEdit : goBack} isEditMode={isEditMode} isDisabled={isDisabled} />
    </Form>
  );
};
