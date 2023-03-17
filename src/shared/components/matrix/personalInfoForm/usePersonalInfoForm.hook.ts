import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useHistory } from 'react-router';
import { ROUTES } from '../../../../routes/app.constants';
import { useMatrixContext } from '../../../../modules/matrix/matrix.context';
import { PersonalInfo } from '../types';

export const usePersonalInfoForm = () => {
  const { personalInfoData, savePersonalInfoData, isLoading, seniorityOptions, positionOptions } = useMatrixContext();
  const form = useForm<PersonalInfo>({ defaultValues: personalInfoData });
  const history = useHistory();

  useEffect(() => {
    const initializeValues = ({ email, name, position, seniority, slackId }: PersonalInfo) => {
      form.setValue('email', email);
      form.setValue('name', name);
      form.setValue('position', position);
      form.setValue('slackId', slackId);
      form.setValue('seniority', seniority);
    };

    initializeValues(personalInfoData);
  }, [personalInfoData]);

  const submit: SubmitHandler<PersonalInfo> = (data) => {
    savePersonalInfoData(data);
    history.push(ROUTES.matrixKnowledge);
  };

  return { form, submit, isLoading, seniorityOptions, positionOptions };
};
