import { FormEvent, useState } from 'react';
import { useHistory } from 'react-router';
import { ROUTES } from '../../../../routes/app.constants';
import { patchUser } from '../../../services/api/endpoints/airtable';
import { reportError } from '../../../utils/reportError';
import { useMatrixContext } from '../../../../modules/matrix/matrix.context';
import { mapSkillsToValues } from '../utils';

export const useOverviewForm = () => {
  const { skills, additionalInfoData, personalInfoData, userId, setIsEditMode } = useMatrixContext();
  const history = useHistory();

  const [isLoading, setIsLoading] = useState(false);

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await patchUser({
        userId,
        skills: {
          expert: mapSkillsToValues(skills.expert),
          intermediate: mapSkillsToValues(skills.intermediate),
          shallow: mapSkillsToValues(skills.shallow),
        },
        personalData: personalInfoData,
        additionalData: additionalInfoData,
      });
      history.push(ROUTES.matrixFinal);
    } catch (err) {
      reportError(err);
    }
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
