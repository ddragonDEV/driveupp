/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { config } from 'config';
import { FC, useState } from 'react';
import { io } from 'socket.io-client';
import { SocketContext, SocketContextProps } from './SocketContext';
import { useAuth } from 'providers/Auth';
import { Status } from './models/Status';

const socket = io(config.apiUrl, { autoConnect: false });

export const SocketProvider: FC = ({ children }) => {
  const auth = useAuth();
  const [status, setStatus] = useState<Status>('disconnected');

  useEffect(() => {
    socket.on('connected_confirm', () => setStatus('connected'));

    socket.on('error', (error) => console.log('socket error', error));

    return () => {
      socket.off();
    };
  }, []);

  const connect = () => {
    !socket.connected && socket.connect();

    if (auth.user) {
      socket.emit('connected', { email: auth.user.email });
    }

    setStatus('connecting');
  };

  const disconnect = () => {
    socket.disconnect();

    setStatus('disconnected');
  };

  const contextValue: SocketContextProps = {
    instance: socket,
    status,
    connect,
    disconnect,
  };

  return (
    <SocketContext.Provider value={contextValue}>
      {children}
    </SocketContext.Provider>
  );
};
