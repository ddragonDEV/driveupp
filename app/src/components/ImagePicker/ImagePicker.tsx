import React, { Dispatch, FC, useState } from 'react';
import { Image, Modal, TouchableOpacity } from 'react-native';
import { Asset } from 'react-native-image-picker';
import { useStyles } from './ImagePickerStyles';
import Icon from 'react-native-vector-icons/Ionicons';
import { Button } from 'components/Button';
import { useMessages } from './ImagePickerMessages';
import { pickImageFromGallery, takePhoto } from './helpers';

interface Props {
  value?: Asset;
  setValue: Dispatch<Asset | undefined>;
}

export const ImagePicker: FC<Props> = ({ setValue, value }) => {
  const styles = useStyles();
  const messages = useMessages();
  const [modalVisible, setModalVisible] = useState(false);

  const handleTakePhoto = async () => {
    setModalVisible(false);
    const photo = await takePhoto();

    setValue(photo);
  };

  const handlePickImageFromGallery = async () => {
    setModalVisible(false);
    const image = await pickImageFromGallery();

    setValue(image);
  };

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.8}
      onPress={() => setModalVisible(true)}
    >
      {value ? (
        <Image style={styles.image} source={value} />
      ) : (
        <Icon style={styles.noImageIcon} name="person" size={70} />
      )}

      <Modal
        statusBarTranslucent
        hardwareAccelerated
        renderToHardwareTextureAndroid
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          onPress={() => setModalVisible(false)}
          activeOpacity={1}
          style={styles.modalBackdrop}
        >
          <TouchableOpacity activeOpacity={1} style={styles.modalContainer}>
            <Button
              title={messages.takePhoto}
              color="secondary"
              onPress={handleTakePhoto}
              style={styles.takePhotoModal}
            />
            <Button
              title={messages.pickAImageFromGallery}
              color="primary"
              onPress={handlePickImageFromGallery}
            />
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </TouchableOpacity>
  );
};
