import { contentfulConfig } from '../../services/api/contentful';
import { getEnvironment, uploadImage } from '../adminPanelTable/adminPanelTable.utils';

export const uploadImageToContentfulAPI = async (file: File) => {
  if (!file) {
    alert('File is null!');
    return;
  }

  const fileName = file.name;
  const fileType = file.type;
  let fileId = null;

  const arrayBuffer: ArrayBuffer = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as ArrayBuffer);
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });

  await getEnvironment(contentfulConfig)
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
      fileId = result.sys.id;
    })
    .catch(console.error);

  return fileId;
};
