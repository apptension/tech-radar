import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAuthContext } from '../../../../modules/auth/auth.context';
import { getSeniorities, getUserPersonalInfo } from '../../../services/api/endpoints/airtable';
import { reportError } from '../../../utils/reportError';
import { PersonalInfo, Seniority } from '../types';

const defaultValues: PersonalInfo = {
  position: '',
  slackId: '',
  email: '',
  name: '',
  seniority: '',
};

export const usePersonalInfoForm = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [seniorityOptions, setSeniorityOptions] = useState<Seniority[]>([]);

  const { user } = useAuthContext();
  const form = useForm<PersonalInfo>({ defaultValues });

  const initializeValues = ({ email, name, position, slackId, seniority }: PersonalInfo) => {
    form.setValue('email', email);
    form.setValue('name', name);
    form.setValue('position', position);
    form.setValue('slackId', slackId);
    form.setValue('seniority', seniority);
  };

  const submit: SubmitHandler<PersonalInfo> = (data) => {
    console.log(data);
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (user) {
        const { data } = await getUserPersonalInfo(user.email);
        initializeValues(data.userInfo);
      }
    };

    const fetchSeniorities = async () => {
      const { data } = await getSeniorities();
      setSeniorityOptions(data.seniorities);
    };

    const getFormData = async () => {
      try {
        await Promise.all([fetchUserInfo(), fetchSeniorities()]);
        setIsLoading(false);
      } catch (err) {
        reportError(err);
      }
    };

    getFormData();
  }, []);

  return { form, submit, isLoading, seniorityOptions };
};
