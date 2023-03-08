import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAuthContext } from '../../../../modules/auth/auth.context';
import { getUserPersonalInfo } from '../../../services/api/endpoints/airtable';
import { PersonalInfo } from '../types';

const defaultValues: PersonalInfo = {
  position: '',
  slackId: '',
  email: '',
  name: '',
};

export const usePersonalInfoForm = () => {
  const { user } = useAuthContext();
  const form = useForm<PersonalInfo>({ defaultValues });

  const initializeValues = ({ email, name, position, slackId }: PersonalInfo) => {
    form.setValue('email', email);
    form.setValue('name', name);
    form.setValue('position', position);
    form.setValue('slackId', slackId);
  };

  const submit: SubmitHandler<PersonalInfo> = (data) => {
    console.log(data);
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (user) {
        try {
          const { data } = await getUserPersonalInfo(user.email);
          initializeValues(data.userInfo);
        } catch (err) {
          console.error(err);
        }
      }
    };

    fetchUserInfo();
  }, []);

  return { form, submit };
};
