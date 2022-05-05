import { config } from 'config';
import { Asset } from 'react-native-image-picker';

export const uploadFile = async ({ data: _data }: { data: Asset }) => {
  const data = new FormData();

  data.append('file', {
    uri: _data.uri,
    type: _data.type,
    name: _data.fileName,
  });
  data.append('upload_preset', config.cloudinaryUploadPreset);
  data.append('cloud_name', config.cloudinaryCloudName);

  const response = await (
    await fetch(
      `${config.cloudinaryUrl}/${config.cloudinaryCloudName}/upload`,
      {
        method: 'post',
        body: data,
      },
    )
  ).json();

  return response.secure_url as string;
};
