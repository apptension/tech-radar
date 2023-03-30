import { FormEvent, useState } from 'react';
import { useHistory } from 'react-router';
import { ROUTES } from '../../../../routes/app.constants';
import { useMatrixContext } from '../../../../modules/matrix/matrix.context';
export const useOverviewForm = () => {
  const { skills, additionalInfoData, setIsEditMode, sendForm } = useMatrixContext();
  const history = useHistory();

  const [isLoading, setIsLoading] = useState(false);

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    await sendForm();
    setIsLoading(false);
  };

  const goBack = () => {
    history.push(ROUTES.matrixAdditionalInfo);
  };

  const editKnowledgeStep = () => {
    setIsEditMode(true);
    history.push(ROUTES.matrixKnowledge);
  };

  const editAdditionalInfoStep = () => {
    setIsEditMode(true);
    history.push(ROUTES.matrixAdditionalInfo);
  };

  return { skills, additionalInfoData, isLoading, submit, goBack, editAdditionalInfoStep, editKnowledgeStep };
};
