import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from 'react';
import { useLocalStorage } from 'react-use';
import { useHistory } from 'react-router';
import { ROUTES } from '../../routes/app.constants';
import { Skills } from '../../shared/components/matrix/knowledgeForm/useKnowledgeForm.hook';
import { AdditionalInfo, PersonalInfo, Position, Seniority } from '../../shared/components/matrix/types';
import { MATRIX_LS_ITEM } from '../../shared/components/matrix/constants/matrix.constants';
import { reportError } from '../../shared/utils/reportError';
import { mapSkillsToValues } from '../../shared/components/matrix/utils';
import { patchUser } from '../../shared/services/api/endpoints/airtable';
import { Loader } from '../../shared/components/loader';
import { usePersonalInfo } from './usePersonInfo.hook';
import { useSkills } from './useSkills.hook';

interface State {
  userId: string;
  personalInfoData: PersonalInfo | null;
  additionalInfoData: AdditionalInfo;
  skills: Skills;
  isEditMode: boolean;
  isLoading: boolean;
  categoryOptions: Seniority[];
  seniorityOptions: Seniority[];
  positionOptions: Position[];
  sendForm: () => Promise<void>;
  setIsEditMode: Dispatch<SetStateAction<boolean>>;
  cancelEdit: () => void;
  saveSkills: (skills: Omit<Skills, 'root'>) => void;
  savePersonalInfoData: (data: PersonalInfo) => void;
  saveAdditionalInfoData: (data: AdditionalInfo) => void;
}

export const MatrixContext = createContext<State | undefined>(undefined);

interface MatrixContextProviderProps {
  children: ReactNode;
}

export const MatrixContextProvider = ({ children }: MatrixContextProviderProps) => {
  const history = useHistory();
  const [, setLocalPersonal, removeLocalPersonal] = useLocalStorage(MATRIX_LS_ITEM.PERSONAL);
  const [, setLocalAdditional, removeLocalAdditional] = useLocalStorage(MATRIX_LS_ITEM.ADDITIONAL);
  const [, setLocalSkills, removeLocalSkills] = useLocalStorage(MATRIX_LS_ITEM.SKILLS);
  const {
    categoryOptions,
    skills,
    updateSkills,
    isFilledIn: isStep2Answered,
    isLoading: isSkillsLoading,
  } = useSkills();
  const {
    seniorityOptions,
    positionOptions,
    additionalInfoData,
    userId,
    personalInfoData,
    isLoading: isUserInfoLoading,
    isPersonalFilledIn: isStep1Answered,
    isAdditionalFilledIn: isStep3Answered,
    updateAdditionalData,
    updatePersonalData,
  } = usePersonalInfo();

  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    if (!isSkillsLoading && !isUserInfoLoading) {
      history.push(
        !isStep1Answered
          ? ROUTES.matrixPersonal
          : !isStep2Answered
          ? ROUTES.matrixKnowledge
          : !isStep3Answered
          ? ROUTES.matrixAdditionalInfo
          : ROUTES.matrixOverview
      );
    }

    const unlisten = history.listen((location) => {
      if (location.pathname === ROUTES.matrixOverview) {
        setIsEditMode(false);
      }
    });

    return () => {
      unlisten();
    };
  }, [isSkillsLoading, isUserInfoLoading]);

  const savePersonalInfoData: State['savePersonalInfoData'] = (data) => {
    updatePersonalData(data);
    setLocalPersonal(data);
  };

  const saveAdditionalInfoData: State['saveAdditionalInfoData'] = (data) => {
    updateAdditionalData(data);
    setLocalAdditional(data);
  };

  const saveSkills: State['saveSkills'] = (addedSkills) => {
    updateSkills(addedSkills);
    setLocalSkills(addedSkills);
  };

  const cancelEdit = () => {
    history.push(ROUTES.matrixOverview);
  };

  const sendForm = async () => {
    try {
      await patchUser({
        userId,
        skills: {
          expert: mapSkillsToValues(skills.expert),
          intermediate: mapSkillsToValues(skills.intermediate),
          shallow: mapSkillsToValues(skills.shallow),
        },
        personalData: personalInfoData,
        additionalData: additionalInfoData,
      });
      removeLocalPersonal();
      removeLocalSkills();
      removeLocalAdditional();
      history.push(ROUTES.matrixFinal);
    } catch (err) {
      reportError(err);
    }
  };

  const value = {
    personalInfoData,
    userId,
    skills,
    additionalInfoData,
    isEditMode,
    isLoading: isUserInfoLoading || isSkillsLoading,
    categoryOptions,
    seniorityOptions,
    positionOptions,
    sendForm,
    setIsEditMode,
    cancelEdit,
    saveSkills,
    saveAdditionalInfoData,
    savePersonalInfoData,
  };

  if (isUserInfoLoading || isSkillsLoading) {
    return <Loader />;
  }

  return <MatrixContext.Provider value={value}>{children}</MatrixContext.Provider>;
};

export const useMatrixContext = () => {
  const context = useContext(MatrixContext);

  if (!context) {
    throw new Error('MatrixContext used outside of Provider!');
  }

  return context;
};
