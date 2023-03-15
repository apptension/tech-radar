import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useHistory } from 'react-router';
import { useAuthContext } from '../../../../modules/auth/auth.context';
import { ROUTES } from '../../../../routes/app.constants';
import { getPostions, getSeniorities, getUserPersonalInfo } from '../../../services/api/endpoints/airtable';
import { reportError } from '../../../utils/reportError';
import { PersonalInfo, Position, Seniority } from '../types';

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
  const [positionOptions, setPositionOptions] = useState<Position[]>([]);

  const history = useHistory();
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
    history.push(ROUTES.matrixKnowledge);
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

    const fetchPositions = async () => {
      if (user) {
        const { data } = await getPostions();
        setPositionOptions(data.positions);
      }
    };

    const getFormData = async () => {
      try {
        await Promise.all([fetchUserInfo(), fetchSeniorities(), fetchPositions()]);
        setIsLoading(false);
      } catch (err) {
        reportError(err);
      }
    };

    getFormData();
  }, []);

  return { form, submit, isLoading, seniorityOptions, positionOptions };
};
