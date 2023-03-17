import { AdditionalInfo, Category, PersonalInfo, Position, Seniority, Skill } from '../../../components/matrix/types';
import { axiosAirtableApi } from '../axiosInstances';

interface UserInfoResponse {
  id: string;
  personalInfo: PersonalInfo;
  additionalInfo: AdditionalInfo;
  skills: { expert: string[]; intermediate: string[]; shallow: string[] };
}

export const getUserPersonalInfo = async (userEmail: string) => {
  return await axiosAirtableApi.get<UserInfoResponse>(`/getUserPersonalInfo/?email=${userEmail}`);
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

export const getSkills = async (search = '', category = '') => {
  return await axiosAirtableApi.get<{ skills: Skill[] }>(`/getSkills/?search=${search}&category=${category}`);
};

export const patchUser = async (data: any) => {
  return await axiosAirtableApi.patch<{ skills: Skill[] }>(`/updateUser`, data);
};
