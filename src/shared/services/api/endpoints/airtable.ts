import { Category, PersonalInfo, Position, Seniority, Skill } from '../../../components/matrix/types';
import { axiosAirtableApi } from '../axiosInstances';

export const getUserPersonalInfo = async (userEmail: string) => {
  return await axiosAirtableApi.get<{ userInfo: PersonalInfo }>(`/getUserPersonalInfo/?email=${userEmail}`);
};

export const getSeniorities = async () => {
  return await axiosAirtableApi.get<{ seniorities: Seniority[] }>('/getSeniorities');
};

export const getPostions = async () => {
  return await axiosAirtableApi.get<{ positions: Position[] }>('/getPositions');
};

export const getCategories = async () => {
  return await axiosAirtableApi.get<{ categories: Category[] }>('/getCategories');
};

export const getSkills = async (search: string, category: string) => {
  return await axiosAirtableApi.get<{ skills: Skill[] }>(`/getSkills/?search=${search}&category=${category}`);
};
