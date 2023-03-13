import { PersonalInfo, Position, Seniority } from '../../../components/matrix/types';
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
