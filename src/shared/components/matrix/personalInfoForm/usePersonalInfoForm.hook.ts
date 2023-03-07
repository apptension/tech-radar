import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
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
  const form = useForm({ defaultValues });

  const initializeValues = ({ email, name, position, slackId }: PersonalInfo) => {
    form.setValue('email', email);
    form.setValue('name', name);
    form.setValue('position', position);
    form.setValue('slackId', slackId);
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

  return { form };
};
