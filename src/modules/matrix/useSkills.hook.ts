import { useEffect, useState } from 'react';
import { useLocalStorage } from 'react-use';
import { MATRIX_LS_ITEM } from '../../shared/components/matrix/constants/matrix.constants';
import { Skills } from '../../shared/components/matrix/knowledgeForm/useKnowledgeForm.hook';
import { Category } from '../../shared/components/matrix/types';
import { checkIfSkillIsAdded, getUserSkillsFromIds } from '../../shared/components/matrix/utils';
import { getCategories, getSkills, getUserSkills } from '../../shared/services/api/endpoints/airtable';
import { useAuthContext } from '../auth/auth.context';
import { reportError } from '../../shared/utils/reportError';

const ALL_AREAS_CATEGORY_OPTION: Category = { label: 'All areas', value: '', color: '' };

export const useSkills = () => {
  const { user } = useAuthContext();
  const [localSkills] = useLocalStorage<Skills>(MATRIX_LS_ITEM.SKILLS);

  const [skills, setSkills] = useState<Skills>({ root: [], expert: [], intermediate: [], shallow: [] });
  const [categoryOptions, setCategoryOptions] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFilledIn, setIsFilledIn] = useState(false);

  const initializeSkills = ({ root, expert, intermediate, shallow }: Skills) =>
    setSkills({
      root: root.filter(({ value }) => checkIfSkillIsAdded([...expert, ...intermediate, ...shallow], value)),
      expert,
      intermediate,
      shallow,
    });

  const updateSkills = (data: Omit<Skills, 'root'>) => {
    setSkills((skills) => ({ ...skills, ...data }));
  };

  useEffect(() => {
    const fetchSkills = async () => {
      const {
        data: { skills },
      } = await getSkills();

      const {
        data: { skills: userSkills },
      } = await getUserSkills(user?.email || '');

      if (localSkills) {
        const { expert, intermediate, shallow } = localSkills;
        initializeSkills({ root: skills, expert, intermediate, shallow });
        return setIsFilledIn(true);
      }

      const expert = getUserSkillsFromIds(userSkills.expert, skills);
      const intermediate = getUserSkillsFromIds(userSkills.intermediate, skills);
      const shallow = getUserSkillsFromIds(userSkills.shallow, skills);
      initializeSkills({ root: skills, expert, intermediate, shallow });
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

  return { categoryOptions, isLoading, isFilledIn, skills, updateSkills };
};
