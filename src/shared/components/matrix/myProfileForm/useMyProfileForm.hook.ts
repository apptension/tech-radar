import { useEffect, useState } from 'react';
import { useLocalStorage } from 'react-use';
import { SubmitHandler, useForm } from 'react-hook-form';
import { getUserInfo, patchUserProfile } from '../../../services/api/endpoints/airtable';
import { reportError } from '../../../utils/reportError';
import { PersonalInfo } from '../types';
import { initializePersonalValues } from '../utils';
import { useAuthContext } from '../../../../modules/auth/auth.context';
import { usePersonalFormSelects } from '../../../../modules/matrix/usePersonalFormSelects.hook';
import { MATRIX_LS_ITEM } from '../constants/matrix.constants';
import { useToast } from '../../toast';

const defaultValues: PersonalInfo = {
  email: '',
  name: '',
  position: '',
  seniority: '',
  slackId: '',
};

export const useMyProfileForm = () => {
  const form = useForm<PersonalInfo>({ defaultValues });
  const { user } = useAuthContext();
  const [, , removeLocalPersonal] = useLocalStorage<PersonalInfo>(MATRIX_LS_ITEM.PERSONAL);
  const { isLoading: isFormSelectsLoading, positionOptions, seniorityOptions } = usePersonalFormSelects();
  const toast = useToast();

  const [userId, setUserId] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const { data } = await getUserInfo(user?.email || '');
        const { id, personalInfo } = data;

        initializePersonalValues(form, personalInfo);
        setUserId(id);
        setIsLoading(false);
      } catch (err) {
        reportError(err);
        toast.error('Failed to fetch user info');
      }
    };

    if (user) {
      fetchUserInfo();
    }
  }, [user]);

  const submit: SubmitHandler<PersonalInfo> = async (data) => {
    setIsSubmitting(true);
    try {
      await patchUserProfile({ userId, ...data });
      removeLocalPersonal();
      toast.success('Submitted successfully!');
    } catch (err) {
      reportError(err);
      toast.error('Failed to update user data');
    }
    setIsSubmitting(false);
  };

  return {
    form,
    isLoading: isLoading || isFormSelectsLoading,
    isSubmitting,
    positionOptions,
    seniorityOptions,
    submit,
  };
};
