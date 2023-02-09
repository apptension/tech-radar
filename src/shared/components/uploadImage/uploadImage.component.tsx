import React, { useState } from 'react';
import { contentfulConfig } from '../../services/api/contentful';
import { getEnvironment, uploadImage } from '../adminPanelTable/adminPanelTable.utils';
import { EditedEntry } from '../../../routes/adminPanel/adminPanel.types';
import { StyledFileInput } from './uploadImage.styles';

interface UploadImageProps {
  editedEntry: EditedEntry;
}

export const UploadImage: React.FC<UploadImageProps> = ({ editedEntry }: UploadImageProps) => {
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImage(event.target.files![0]);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    const fileName = image!.name;
    const fileType = image!.type;
    let imageId;

    try {
      const arrayBuffer: ArrayBuffer = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as ArrayBuffer);
        reader.onerror = reject;
        reader.readAsArrayBuffer(image!);
      });

      getEnvironment(contentfulConfig)
        .then((environment) =>
          environment.createAssetFromFiles({
            fields: {
              title: {
                'en-US': fileName,
              },
              description: {
                'en-US': fileName,
              },
              file: {
                'en-US': {
                  contentType: fileType,
                  fileName: fileName,
                  file: arrayBuffer,
                },
              },
            },
          })
        )
        .then((asset) => asset.processForAllLocales())
        .then(async (asset) => {
          const result = await asset.publish();
          imageId = result.sys.id;
          uploadImage(editedEntry.id, imageId);
          setLoading(false);
        })
        .catch(console.error);
    } catch (err) {
      setLoading(false);
      console.debug(err);
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
