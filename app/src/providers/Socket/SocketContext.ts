import { createContext } from 'react';
import { Socket } from 'socket.io-client';
import { Status } from './models/Status';

export type SocketContextProps = {
  instance: Socket;
  status: Status;
  connect: () => void;
  disconnect: () => void;
};

export const SocketContext = createContext<SocketContextProps>(
  {} as SocketContextProps,
);
