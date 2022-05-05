import { createContext, ReactChild } from 'react';
import { ModalProps } from 'react-native';

export interface ModalContextProps {
  visible: boolean;
  handleOpen: ({}: { content: ReactChild; options?: ModalProps }) => void;
  handleHide: () => void;
  options?: ModalProps;
  content?: ReactChild;
}

export const ModalContext = createContext<ModalContextProps>(
  {} as ModalContextProps,
);
