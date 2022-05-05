/* eslint-disable no-shadow */
import React, { ReactChild, useState } from 'react';
import { ModalProps } from 'react-native';
import { ModalContext, ModalContextProps } from './ModalContext';

export const ModalProvider: React.FC = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const [content, setContent] = useState<ReactChild>();
  const [options, setOptions] = useState<ModalProps>();

  const contextValue: ModalContextProps = {
    visible,
    content,
    options,
    handleOpen: ({ content, options }) => {
      setVisible(true);
      setContent(content);
      setOptions(options);
    },
    handleHide: () => setVisible(false),
  };

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
    </ModalContext.Provider>
  );
};
