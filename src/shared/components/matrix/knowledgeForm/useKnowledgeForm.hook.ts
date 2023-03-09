import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useAuthContext } from '../../../../modules/auth/auth.context';
import { ROUTES } from '../../../../routes/app.constants';
import { getCategories, getSkills } from '../../../services/api/endpoints/airtable';
import { reportError } from '../../../utils/reportError';
import { Category, Seniority, Skill } from '../types';

export const useKnowledgeForm = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categoryOptions, setCategoryOptions] = useState<Seniority[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);

  const { user } = useAuthContext();
  const history = useHistory();

  const allCategoriesOption: Category = { label: 'All areas', value: '', color: '' };

  const handleBack = () => {
    history.push(ROUTES.matrixPersonal);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      if (user) {
        const { data } = await getCategories();
        setCategoryOptions([allCategoriesOption, ...data.categories]);
      }
    };

    const fetchSkills = async () => {
      const { data } = await getSkills();
      setSkills(data.skills);
    };

    const getData = async () => {
      try {
        await Promise.all([fetchCategories(), fetchSkills()]);
        setIsLoading(false);
      } catch (err) {
        reportError(err);
      }
    };

    getData();
  }, []);

  return { isLoading, skills, categoryOptions, search, setSearch, selectedCategory, setSelectedCategory, handleBack };
};
