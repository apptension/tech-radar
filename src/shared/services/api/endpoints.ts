import { EditedEntry } from '../../../routes/admin/adminPanel/adminPanel.types';
import { axiosFunctionsApi } from './axiosInstances';

export const patchEntry = async ({ id, icon, iconUpload, ...editedEntry }: EditedEntry, email: string) => {
  let iconId = '';

  if (iconUpload) {
    const { data } = await postImage(iconUpload, email);
    iconId = data.fileId;
    await postEntryImage(id!, data.fileId, email);
  }
  return await axiosFunctionsApi.patch(
    '/updateEntry',
    { editedEntry, icon: iconId, entryId: id },
    { params: { email } }
  );
};

export const postEntry = async (entryData: EditedEntry, email: string) => {
  return await axiosFunctionsApi.post('/createEntry', { entryData }, { params: { email } });
};

export const postImage = async (file: File, email: string) => {
  const formData = new FormData();
  formData.append('file', file);
  return await axiosFunctionsApi.post<{ fileId: string }>('/uploadImage', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    params: { email },
  });
};

export const postEntryImage = async (entryId: string, imageId: string, email: string) => {
  return await axiosFunctionsApi.post('uploadEntryImage', { entryId, imageId }, { params: { email } });
};

export const getLastUpdate = async () => {
  return await axiosFunctionsApi.get<{ dataUpdatedAt: string }>('/getLastUpdate');
};

export const getVerifyUser = async (email: string) => {
  return await axiosFunctionsApi.get('/verifyUser', { params: { email } });
};
