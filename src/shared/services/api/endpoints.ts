import { EditedEntry } from '../../../routes/adminPanel/adminPanel.types';
import { axiosFunctionsApi } from './axiosInstances';
import { contentfulConfig } from './contentful';

export const patchEntry = async (editedEntry: EditedEntry) => {
  return await axiosFunctionsApi.patch('updateEntry', { ...contentfulConfig, editedEntry });
};

export const deleteEntry = async (id: string) => {
  return await axiosFunctionsApi.post('deleteEntry', { ...contentfulConfig, id });
};

export const patchImage = async (entryId: string, imageId: string) => {
  return await axiosFunctionsApi.patch('uploadImage', { ...contentfulConfig, entryId, imageId });
};

export const postAsset = async (file: File) => {
  return await axiosFunctionsApi.post('createAsset', { ...contentfulConfig, file });
};

export const postEntry = async (entry: EditedEntry) => {
  return await axiosFunctionsApi.post('createEntry', { ...contentfulConfig, entry });
};

export const postImage = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('environment', contentfulConfig.environment);
  formData.append('space', contentfulConfig.space);
  return await axiosFunctionsApi.post('uploadImage', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const postEntryImage = async (entryId: string, imageId: string) => {
  return await axiosFunctionsApi.post('uploadEntryImage', { ...contentfulConfig, entryId, imageId });
};

export const getLastUpdate = async () => {
  return await axiosFunctionsApi.get(
    `getLastUpdate/?space=${contentfulConfig.space}&environment=${contentfulConfig.environment}`
  );
};
