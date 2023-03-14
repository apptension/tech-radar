import { FormActions } from '../formActions';
import { ADDITIONAL_SKILLS_INFO_TEXT, LIKE_TO_LEARN_INFO_TEXT } from './additionalInfoForm.constants';
import { Form, StyledValueBox, Textarea, TextAreasContainer } from './additionalInfoForm.styles';
import { useAdditionalInfoForm } from './useAdditionalInfoForm.hook';

export const AdditionalInfoForm = () => {
  const { form, submit, goBack } = useAdditionalInfoForm();

  const { handleSubmit, register } = form;

  return (
    <Form onSubmit={handleSubmit(submit)}>
      <TextAreasContainer>
        <StyledValueBox maxContentHeight="190px" label="Additional skills" infoContent={ADDITIONAL_SKILLS_INFO_TEXT}>
          <Textarea {...register('additionalSkills')} />
        </StyledValueBox>

        <StyledValueBox maxContentHeight="190px" label="I would like to learn" infoContent={LIKE_TO_LEARN_INFO_TEXT}>
          <Textarea {...register('likeToLearn')} />
        </StyledValueBox>
      </TextAreasContainer>

      <FormActions handleGoBack={goBack} />
    </Form>
  );
};
