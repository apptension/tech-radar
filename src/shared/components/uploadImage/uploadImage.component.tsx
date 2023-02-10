import React, { useState } from 'react';
import { uploadImage } from '../adminPanelTable/adminPanelTable.utils';
import { EditedEntry } from '../../../routes/adminPanel/adminPanel.types';
import { StyledFileInput } from './uploadImage.styles';
import { uploadImageToContentfulAPI } from './uploadImage.utils';

interface UploadImageProps {
  editedEntry: EditedEntry;
}

export const UploadImage: React.FC<UploadImageProps> = ({ editedEntry }: UploadImageProps) => {
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.[0]) return null;
    setImage(event.target.files![0]);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      await uploadImageToContentfulAPI(image!).then((imageId) => uploadImage(editedEntry.id!, imageId!));
    } catch (err) {
      console.debug(err);
    } finally {
      setLoading(false);
    }
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
