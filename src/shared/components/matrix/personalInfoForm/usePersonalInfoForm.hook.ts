import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useHistory } from 'react-router';
import { ROUTES } from '../../../../routes/app.constants';
import { useMatrixContext } from '../../../../modules/matrix/matrix.context';
import { PersonalInfo } from '../types';
import { initializePersonalValues } from '../utils';

const defaultValues: PersonalInfo = {
  email: '',
  name: '',
  position: '',
  seniority: '',
  slackId: '',
};

export const usePersonalInfoForm = () => {
  const form = useForm<PersonalInfo>({ defaultValues });
  const { personalInfoData, savePersonalInfoData, isLoading, seniorityOptions, positionOptions } = useMatrixContext();
  const history = useHistory();

  const submit: SubmitHandler<PersonalInfo> = (data) => {
    savePersonalInfoData(data);
    history.push(ROUTES.matrixKnowledge);
  };

  useEffect(() => {
    if (personalInfoData) {
      initializePersonalValues(form, personalInfoData);
    }
  }, [personalInfoData]);

  return { form, submit, isLoading, seniorityOptions, positionOptions };
};
