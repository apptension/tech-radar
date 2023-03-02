import { EditedEntry } from '../../../routes/adminPanel/adminPanel.types';
import { patchEntry, deleteEntry as deleteEntryAPI } from '../../services/api/endpoints';

export const updateEntry = async (editedEntry: EditedEntry) => {
  try {
    await patchEntry(editedEntry);
  } catch (err) {
    console.error(err);
  }
};

export const deleteEntry = async (id: string) => {
  try {
    await deleteEntryAPI(id);
  } catch (err) {
    console.error(err);
  }
};
