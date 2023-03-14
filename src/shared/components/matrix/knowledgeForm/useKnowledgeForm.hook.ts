import { FormEvent, useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import debounce from 'lodash.debounce';
import { useAuthContext } from '../../../../modules/auth/auth.context';
import { ROUTES } from '../../../../routes/app.constants';
import { getCategories, getSkills } from '../../../services/api/endpoints/airtable';
import { reportError } from '../../../utils/reportError';
import { Category, Seniority, Skill, SkillWithVisibility } from '../types';

export interface Skills {
  root: SkillWithVisibility[];
  expert: SkillWithVisibility[];
  intermediate: SkillWithVisibility[];
  shallow: SkillWithVisibility[];
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

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleBack = () => {
    history.push(ROUTES.matrixPersonal);
  };

  const fetchSkills = async ({ search, category }: SkillsSearch) => {
    setIsSearching(true);
    const { data } = await getSkills(search, category);

    // IN CASE FETCHED SKILL IS ALREADY ADDED TO SOME CATEGORY WE'RE NOT DISPLAYING IT
    const checkIfSkillIsAdded = (skills: Skill[], skillValue: string) =>
      skillValue !== skills.find((item) => item.value === skillValue)?.value;

    const updateSkillsWithIsVisible = (skills: Skill[]) =>
      skills.map((skill) => ({ ...skill, isVisible: Boolean(data.skills.find(({ value }) => value === skill.value)) }));

    setSkills((skills) => ({
      root: data.skills
        .filter(
          ({ value }) =>
            checkIfSkillIsAdded(skills.expert, value) &&
            checkIfSkillIsAdded(skills.intermediate, value) &&
            checkIfSkillIsAdded(skills.shallow, value)
        )
        .map((skill) => ({ ...skill, isVisible: true })),
      expert: updateSkillsWithIsVisible(skills.expert),
      intermediate: updateSkillsWithIsVisible(skills.intermediate),
      shallow: updateSkillsWithIsVisible(skills.shallow),
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
    submit,
    handleCategoryChange,
    handleBack,
    handleSearchChange,
  };
};
