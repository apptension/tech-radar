import { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import debounce from 'lodash.debounce';
import { useAuthContext } from '../../../../modules/auth/auth.context';
import { ROUTES } from '../../../../routes/app.constants';
import { getCategories, getSkills } from '../../../services/api/endpoints/airtable';
import { reportError } from '../../../utils/reportError';
import { Category, Seniority, Skill } from '../types';

export interface Skills {
  root: Skill[];
  expert: Skill[];
  intermediate: Skill[];
  shallow: Skill[];
}
interface SkillsSearch {
  search: string;
  category: string;
}

export const useKnowledgeForm = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categoryOptions, setCategoryOptions] = useState<Seniority[]>([]);
  const [skills, setSkills] = useState<Skills>({ root: [], expert: [], intermediate: [], shallow: [] });

  const { user } = useAuthContext();
  const history = useHistory();

  const allCategoriesOption: Category = { label: 'All areas', value: '', color: '' };

  const handleBack = () => {
    history.push(ROUTES.matrixPersonal);
  };

  const fetchSkills = async ({ search, category }: SkillsSearch) => {
    setIsSearching(true);
    const { data } = await getSkills(search, category);

    // IN CASE FETCHED SKILL IS ALREADY ADDED TO SOME CATEGORY WE'RE NOT DISPLAYING IT
    const checkIfSkillIsAdded = (skills: Skill[], skillValue: string) =>
      skillValue !== skills.find((item) => item.value === skillValue)?.value;

    setSkills((skills) => ({
      ...skills,
      root: data.skills.filter(
        (skill) =>
          checkIfSkillIsAdded(skills.expert, skill.value) &&
          checkIfSkillIsAdded(skills.intermediate, skill.value) &&
          checkIfSkillIsAdded(skills.shallow, skill.value)
      ),
    }));
    setIsSearching(false);
  };

  const debouncedSearch = useCallback(
    debounce(async ({ search, category }: SkillsSearch) => {
      await fetchSkills({ search, category });
    }, 1000),
    []
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    debouncedSearch({ search: e.target.value, category: selectedCategory });
  };

  const handleCategoryChange = async ({ value }: any) => {
    setSelectedCategory(value);
    await fetchSkills({ search, category: value });
  };

  useEffect(() => {
    const fetchCategories = async () => {
      if (user) {
        const { data } = await getCategories();
        setCategoryOptions([allCategoriesOption, ...data.categories]);
      }
    };

    const getData = async () => {
      try {
        await Promise.all([fetchCategories(), fetchSkills({ search, category: selectedCategory })]);
        setIsLoading(false);
      } catch (err) {
        reportError(err);
      }
    };

    getData();

    return () => {
      debouncedSearch.cancel();
    };
  }, []);

  return {
    isLoading,
    skills,
    categoryOptions,
    search,
    setSkills,
    selectedCategory,
    isSearching,
    handleCategoryChange,
    handleBack,
    handleSearchChange,
  };
};
