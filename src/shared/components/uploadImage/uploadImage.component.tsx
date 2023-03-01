import { useState } from 'react';

import { EditedEntry } from '../../../routes/adminPanel/adminPanel.types';
import { postEntryImage, postImage } from '../../services/api/endpoints';
import { StyledFileInput } from './uploadImage.styles';

interface UploadImageProps {
  editedEntry: EditedEntry;
}

export const UploadImage = ({ editedEntry }: UploadImageProps) => {
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.[0]) return null;
    setImage(event.target.files[0]);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    if (!image) {
      alert('The file is invalid!');
      return;
    }

    setLoading(true);
    try {
      const { data } = await postImage(image);
      await postEntryImage(editedEntry.id!, data.fileId);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <StyledFileInput type="file" onChange={handleFileChange} />
      <button type="submit" disabled={loading}>
        {loading ? 'Uploading...' : 'Upload'}
      </button>
      {error && <p>{error}</p>}
    </form>
  );
};
