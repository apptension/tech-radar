import _ from 'lodash';
import { FormEvent, useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import debounce from 'lodash.debounce';
import { ROUTES } from '../../../../routes/app.constants';
import { getSkills } from '../../../services/api/endpoints/airtable';
import { Skill, SkillWithVisibility } from '../types';
import { useMatrixContext } from '../../../../modules/matrix/matrixContext';
import { checkIfSkillIsAdded, findSkill } from '../utils';

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
  const { skills: savedSkills, saveSkills, isEditMode, categoryOptions, cancelEdit } = useMatrixContext();
  const history = useHistory();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [skills, setSkills] = useState<Skills>(savedSkills);

  const checkIfIsDisabled = () => {
    const { root: savedRoot, ...assignedSavedSkills } = savedSkills;
    const { root, ...assignedSkills } = skills;
    return isEditMode && _.isEqual(assignedSkills, assignedSavedSkills);
  };

  const isDisabled = checkIfIsDisabled();

  useEffect(() => {
    setSkills(savedSkills);
  }, [savedSkills]);

  useEffect(() => {
    fetchSkills({ search, category: selectedCategory });
  }, []);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    saveSkills(skills);
    history.push(isEditMode ? ROUTES.matrixOverview : ROUTES.matrixAdditionalInfo);
  };

  const goBack = () => {
    history.push(ROUTES.matrixPersonal);
  };

  const fetchSkills = async ({ search, category }: SkillsSearch) => {
    setIsSearching(true);
    const { data } = await getSkills(search, category);

    const updateSkillsWithIsVisible = (skills: Skill[]) =>
      skills.map((skill) => ({ ...skill, isVisible: Boolean(findSkill(skill.value, data.skills)) }));

    setSkills((skills) => ({
      root: data.skills
        // IN CASE FETCHED SKILL IS ALREADY ADDED TO SOME CATEGORY WE'RE NOT DISPLAYING IT
        .filter(({ value }) =>
          checkIfSkillIsAdded([...skills.expert, ...skills.intermediate, ...skills.shallow], value)
        ),
      expert: updateSkillsWithIsVisible(skills.expert),
      intermediate: updateSkillsWithIsVisible(skills.intermediate),
      shallow: updateSkillsWithIsVisible(skills.shallow),
    }));
    setIsSearching(false);
  };

  const debouncedSearch = useCallback(
    debounce(async (filters: SkillsSearch) => {
      await fetchSkills(filters);
    }, 1000),
    []
  );

  const handleSearchChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(target.value);
    debouncedSearch({ search: target.value, category: selectedCategory });
  };

  const handleCategoryChange = async ({ value }: any) => {
    setSelectedCategory(value);
    await fetchSkills({ search, category: value });
  };

  return {
    skills,
    categoryOptions,
    search,
    setSkills,
    selectedCategory,
    isSearching,
    isEditMode,
    isDisabled,
    cancelEdit,
    submit,
    handleCategoryChange,
    goBack,
    handleSearchChange,
  };
};
