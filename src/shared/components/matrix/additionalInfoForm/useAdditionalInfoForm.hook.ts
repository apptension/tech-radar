import { SubmitHandler, useForm } from 'react-hook-form';
import { useHistory } from 'react-router';
import { ROUTES } from '../../../../routes/app.constants';

interface AdditionalInfoFormValues {
  additionalSkills: string;
  likeToLearn: string;
}

const defaultValues: AdditionalInfoFormValues = { additionalSkills: '', likeToLearn: '' };

export const useAdditionalInfoForm = () => {
  const history = useHistory();
  const form = useForm<AdditionalInfoFormValues>({ defaultValues });

  const goBack = () => {
    history.push(ROUTES.matrixKnowledge);
  };

  const submit: SubmitHandler<AdditionalInfoFormValues> = (data) => {
    // ADD SUBMIT LOGIC
  };

  return { form, submit, goBack };
};
