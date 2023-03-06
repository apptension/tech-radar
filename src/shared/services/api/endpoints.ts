import { EditedEntry } from '../../../routes/adminPanel/adminPanel.types';
import { axiosFunctionsApi } from './axiosInstances';

export const patchEntry = async ({ id, icon, iconUpload, ...editedEntry }: EditedEntry) => {
  let iconId = '';

  if (iconUpload) {
    const { data } = await postImage(iconUpload);
    iconId = data.fileId;
    await postEntryImage(id!, data.fileId);
  }
  return await axiosFunctionsApi.patch('/updateEntry', { editedEntry, icon: iconId, entryId: id });
};

export const deleteEntry = async (id: string) => {
  return await axiosFunctionsApi.post('/deleteEntry', { id });
};

export const postEntry = async (entryData: EditedEntry) => {
  return await axiosFunctionsApi.post('/createEntry', { entryData });
};

export const postImage = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  return await axiosFunctionsApi.post<{ fileId: string }>('/uploadImage', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const postEntryImage = async (entryId: string, imageId: string) => {
  return await axiosFunctionsApi.post('uploadEntryImage', { entryId, imageId });
};

export const getLastUpdate = async () => {
  return await axiosFunctionsApi.get<{ dataUpdatedAt: string }>('/getLastUpdate');
};
