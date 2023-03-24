import { useEffect, useState } from 'react';
import { useAuthContext } from '../../../../modules/auth/auth.context';
import { getPostions, getSeniorities, getUserInfo } from '../../../services/api/endpoints/airtable';
import { reportError } from '../../../utils/reportError';
import { AdditionalInfo, PersonalInfo, Position, Seniority } from '../types';

export const usePersonalInfo = () => {
  const { user } = useAuthContext();
  const [userId, setUserId] = useState('');
  const [personalInfoData, setPersonalInfoData] = useState<PersonalInfo | null>(null);
  const [additionalInfoData, setAdditionalInfoData] = useState<AdditionalInfo>({
    additionalSkills: '',
    likeToLearn: '',
  });

  const [seniorityOptions, setSeniorityOptions] = useState<Seniority[]>([]);
  const [positionOptions, setPositionOptions] = useState<Position[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const {
        data: { id, additionalInfo, personalInfo },
      } = await getUserInfo(user?.email || '');

      setPersonalInfoData(personalInfo);
      setAdditionalInfoData(additionalInfo);
      setUserId(id);
    };

    const fetchSeniorities = async () => {
      const { data } = await getSeniorities();
      setSeniorityOptions(data.seniorities);
    };

    const fetchPositions = async () => {
      const { data } = await getPostions();
      setPositionOptions(data.positions);
    };

    const getAllData = async () => {
      try {
        await Promise.all([fetchUserInfo(), fetchSeniorities(), fetchPositions()]);
        setIsLoading(false);
      } catch (err) {
        reportError(err);
      }
    };

    if (user) {
      getAllData();
    }
  }, [user]);

  return {
    userId,
    personalInfoData,
    setPersonalInfoData,
    setAdditionalInfoData,
    additionalInfoData,
    seniorityOptions,
    positionOptions,
    isLoading,
  };
};
