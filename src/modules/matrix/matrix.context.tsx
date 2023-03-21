import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useAuthContext } from '../auth/auth.context';
import { ROUTES } from '../../routes/app.constants';
import { getCategories, getSkills, getUserSkills } from '../../shared/services/api/endpoints/airtable';
import { reportError } from '../../shared/utils/reportError';
import { Skills } from '../../shared/components/matrix/knowledgeForm/useKnowledgeForm.hook';
import { AdditionalInfo, Category, PersonalInfo, Position, Seniority } from '../../shared/components/matrix/types';
import { checkIfSkillIsAdded, getUserSkillsFromIds } from '../../shared/components/matrix/utils';
import { usePersonalInfo } from '../../shared/components/matrix/hooks/usePersonInfo.hook';

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
  const { user } = useAuthContext();
  const history = useHistory();
  const {
    seniorityOptions,
    positionOptions,
    additionalInfoData,
    userId,
    personalInfoData,
    isLoading: isUserInfoLoading,
    setPersonalInfoData,
    setAdditionalInfoData,
  } = usePersonalInfo();

  const [skills, setSkills] = useState<Skills>({ root: [], expert: [], intermediate: [], shallow: [] });
  const [categoryOptions, setCategoryOptions] = useState<Category[]>([]);

  const [step1Answered, setStep1Answered] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const ALL_AREAS_CATEGORY_OPTION: Category = { label: 'All areas', value: '', color: '' };

  useEffect(() => {
    const fetchSkills = async () => {
      const {
        data: { skills },
      } = await getSkills();

      const {
        data: { skills: userSkills },
      } = await getUserSkills(user?.email || '');

      const expertSkills = getUserSkillsFromIds(userSkills.expert, skills);
      const intermediateSkills = getUserSkillsFromIds(userSkills.intermediate, skills);
      const shallowSkills = getUserSkillsFromIds(userSkills.shallow, skills);

      setSkills({
        root: skills.filter(({ value }) =>
          checkIfSkillIsAdded([...expertSkills, ...intermediateSkills, ...shallowSkills], value)
        ),
        expert: expertSkills,
        intermediate: intermediateSkills,
        shallow: shallowSkills,
      });
    };

    const fetchSkillCategories = async () => {
      const { data } = await getCategories();
      setCategoryOptions([ALL_AREAS_CATEGORY_OPTION, ...data.categories]);
    };

    const getAllData = async () => {
      try {
        await Promise.all([fetchSkillCategories(), fetchSkills()]);
        setIsLoading(false);
      } catch (err) {
        reportError(err);
      }
    };

    if (user) {
      getAllData();
    }
  }, [user]);

  useEffect(() => {
    if (!step1Answered) {
      history.push(ROUTES.matrixPersonal);
    }

    const unlisten = history.listen((location) => {
      if (location.pathname === ROUTES.matrixOverview) {
        setIsEditMode(false);
      }
    });

    return () => {
      unlisten();
    };
  }, []);

  const savePersonalInfoData: State['savePersonalInfoData'] = (data) => {
    setPersonalInfoData(data);
    setStep1Answered(true);
  };

  const saveAdditionalInfoData: State['saveAdditionalInfoData'] = (data) => {
    setAdditionalInfoData(data);
  };

  const saveSkills: State['saveSkills'] = (addedSkills) => {
    setSkills((skills) => ({ ...skills, ...addedSkills }));
  };

  const cancelEdit = () => {
    history.push(ROUTES.matrixOverview);
  };

  const value = {
    personalInfoData,
    userId,
    skills,
    additionalInfoData,
    isEditMode,
    isLoading: isUserInfoLoading || isLoading,
    categoryOptions,
    seniorityOptions,
    positionOptions,
    setIsEditMode,
    cancelEdit,
    saveSkills,
    saveAdditionalInfoData,
    savePersonalInfoData,
  };

  return <MatrixContext.Provider value={value}>{children}</MatrixContext.Provider>;
};

export const useMatrixContext = () => {
  const context = useContext(MatrixContext);

  if (!context) {
    throw new Error('MatrixContext used outside of Provider!');
  }

  return context;
};
