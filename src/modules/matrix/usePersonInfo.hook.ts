import { useEffect, useState } from 'react';
import { useLocalStorage } from 'react-use';
import { useAuthContext } from '../auth/auth.context';
import { getUserInfo } from '../../shared/services/api/endpoints/airtable';
import { reportError } from '../../shared/utils/reportError';
import { MATRIX_LS_ITEM } from '../../shared/components/matrix/constants/matrix.constants';
import { AdditionalInfo, PersonalInfo } from '../../shared/components/matrix/types';
import { usePersonalFormSelects } from './usePersonalFormSelects.hook';

export const usePersonalInfo = () => {
  const { user } = useAuthContext();
  const { isLoading: isFormSelectsLoading, positionOptions, seniorityOptions } = usePersonalFormSelects();
  const [localPersonal] = useLocalStorage<PersonalInfo>(MATRIX_LS_ITEM.PERSONAL);
  const [localAdditional] = useLocalStorage<AdditionalInfo>(MATRIX_LS_ITEM.ADDITIONAL);

  const [userId, setUserId] = useState('');
  const [personalInfoData, setPersonalInfoData] = useState<PersonalInfo | null>(null);
  const [additionalInfoData, setAdditionalInfoData] = useState<AdditionalInfo>({
    additionalSkills: '',
    likeToLearn: '',
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isPersonalFilledIn, setIsPersonalFilledIn] = useState(false);
  const [isAdditionalFilledIn, setIsAdditionalFilledIn] = useState(false);

  const updatePersonalData = (data: PersonalInfo) => {
    setPersonalInfoData(data);
    setIsPersonalFilledIn(true);
  };

  const updateAdditionalData = (data: AdditionalInfo) => {
    setAdditionalInfoData(data);
    setIsAdditionalFilledIn(true);
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const {
          data: { id, additionalInfo, personalInfo },
        } = await getUserInfo(user?.email || '');

        const savePersonalData = () => {
          if (localPersonal) {
            setPersonalInfoData(localPersonal);
            return setIsPersonalFilledIn(true);
          }
          setPersonalInfoData(personalInfo);
        };

        const saveAdditionalData = () => {
          if (localAdditional) {
            setAdditionalInfoData(localAdditional);
            return setIsAdditionalFilledIn(true);
          }
          setAdditionalInfoData(additionalInfo);
        };

        savePersonalData();
        saveAdditionalData();
        setUserId(id);
        setIsLoading(false);
      } catch (err) {
        reportError(err);
      }
    };

    if (user) {
      fetchUserInfo();
    }
  }, [user]);

  return {
    userId,
    personalInfoData,
    additionalInfoData,
    seniorityOptions,
    positionOptions,
    isLoading: isLoading || isFormSelectsLoading,
    isPersonalFilledIn,
    isAdditionalFilledIn,
    updatePersonalData,
    updateAdditionalData,
  };
};
