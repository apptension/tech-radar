import { SubmitHandler, useForm } from 'react-hook-form';
import { useHistory } from 'react-router';
import { ROUTES } from '../../../../routes/app.constants';
import { useMatrixContext } from '../../../../modules/matrix/matrixContext';

export interface AdditionalInfoFormValues {
  additionalSkills: string;
  likeToLearn: string;
}

export const useAdditionalInfoForm = () => {
  const { additionalInfoData, saveAdditionalInfoData, isEditMode, cancelEdit } = useMatrixContext();
  const form = useForm<AdditionalInfoFormValues>({ defaultValues: additionalInfoData });
  const history = useHistory();

  const isDisabled = isEditMode && !form.formState.isDirty;

  const goBack = () => {
    history.push(ROUTES.matrixKnowledge);
  };

  const submit: SubmitHandler<AdditionalInfoFormValues> = (data) => {
    saveAdditionalInfoData(data);
    history.push(ROUTES.matrixOverview);
  };

  return { form, isEditMode, isDisabled, submit, goBack, cancelEdit };
};
