import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { patchUserProfile } from '../../../services/api/endpoints/airtable';
import { reportError } from '../../../utils/reportError';
import { PersonalInfo } from '../types';
import { initializePersonalValues } from '../utils';
import { usePersonalInfo } from '../hooks/usePersonInfo.hook';

const defaultValues: PersonalInfo = {
  email: '',
  name: '',
  position: '',
  seniority: '',
  slackId: '',
};

export const useMyProfileForm = () => {
  const { personalInfoData, isLoading, positionOptions, seniorityOptions, userId } = usePersonalInfo();
  const form = useForm<PersonalInfo>({ defaultValues });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (personalInfoData) {
      initializePersonalValues(form, personalInfoData);
    }
  }, [personalInfoData]);

  const submit: SubmitHandler<PersonalInfo> = async (data) => {
    setIsSubmitting(true);
    try {
      await patchUserProfile({ userId, ...data });
    } catch (err) {
      reportError(err);
    }
    setIsSubmitting(false);
  };

  return { form, isLoading, isSubmitting, positionOptions, seniorityOptions, submit };
};
