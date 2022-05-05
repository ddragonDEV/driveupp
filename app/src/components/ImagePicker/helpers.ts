import {
  Asset,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';

export const pickImageFromGallery = async (): Promise<Asset> => {
  return new Promise((resolve) => {
    launchImageLibrary(
      {
        quality: 1,
        mediaType: 'photo',
      },
      ({ assets }) => assets?.length && assets[0].uri && resolve(assets[0]),
    );
  });
};

export const takePhoto = async (): Promise<Asset> => {
  return new Promise((resolve) => {
    launchCamera(
      {
        quality: 1,
        mediaType: 'photo',
      },
      ({ assets }) => assets?.length && assets[0].uri && resolve(assets[0]),
    );
  });
};
