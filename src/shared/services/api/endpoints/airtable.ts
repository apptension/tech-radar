import { PersonalInfo } from '../../../components/matrix/types';
import { axiosAirtableApi } from '../axiosInstances';

export const getUserPersonalInfo = async (userEmail: string) => {
  return await axiosAirtableApi.get<{ userInfo: PersonalInfo }>(`/getUserPersonalInfo/?email=${userEmail}`);
};
