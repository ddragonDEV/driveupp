import React from 'react';
import { LogBox } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MainStackNavigator } from 'navigation/MainStackNavigator';
import { LanguageProvider } from 'providers/Language';
import { LoaderProvider } from 'providers/Loader';
import { ModalProvider } from 'providers/Modal';
import { PermissionsProvider } from 'providers/Permissions';
import { ThemeProvider } from 'providers/Theme';
import { AuthProvider } from 'providers/Auth';
import { SocketProvider } from 'providers/Socket';
import { LocationProvider } from 'providers/Location';
import { RoleManager } from 'providers/RoleManager';

LogBox.ignoreLogs(['new NativeEventEmitter', 'componentWillReceiveProps']);

export const App = () => (
  <SafeAreaProvider>
    <LanguageProvider defaultLanguage="es">
      <LoaderProvider>
        <PermissionsProvider>
          <ThemeProvider defaultTheme="light">
            <ModalProvider>
              <LocationProvider>
                <AuthProvider>
                  <SocketProvider>
                    <RoleManager>
                      <MainStackNavigator />
                    </RoleManager>
                  </SocketProvider>
                </AuthProvider>
              </LocationProvider>
            </ModalProvider>
          </ThemeProvider>
        </PermissionsProvider>
      </LoaderProvider>
    </LanguageProvider>
  </SafeAreaProvider>
);
