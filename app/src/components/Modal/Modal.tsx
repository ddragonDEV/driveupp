import React from 'react';
import { Modal as RNModal, TouchableOpacity } from 'react-native';
import { useModal } from '../../providers/Modal';
import { useStyles } from './ModalStyles';

export const Modal: React.FC = () => {
  const { handleHide, visible, content, options } = useModal();
  const styles = useStyles();

  return (
    <RNModal
      statusBarTranslucent
      hardwareAccelerated
      renderToHardwareTextureAndroid
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={handleHide}
      {...options}
    >
      <TouchableOpacity
        onPress={handleHide}
        activeOpacity={1}
        style={styles.backdrop}
      >
        <TouchableOpacity activeOpacity={1} style={styles.container}>
          {content}
        </TouchableOpacity>
      </TouchableOpacity>
    </RNModal>
  );
};
