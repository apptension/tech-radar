import { postEntry } from '../../shared/services/api/endpoints';
import { EditedEntry } from '../adminPanel/adminPanel.types';
import { NewEntryInputs } from './newEntry.component';

export const createEntry = async (entry: EditedEntry) => {
  try {
    const { data } = await postEntry(entry);
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const prepareNewEntry = (data: NewEntryInputs, iconId?: string): EditedEntry => {
  const getIcon = (id: string, name: string) => ({ id, name, description: '', url: '' });

  return {
    ...data,
    icon: iconId && data.icon ? getIcon(iconId, data.icon[0].name) : undefined,
    moved: +data.moved,
  };
};
