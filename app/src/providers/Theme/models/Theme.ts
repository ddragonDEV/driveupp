import { TextStyle } from 'react-native';

export interface Theme {
  name: string;
  spacing: (n?: number) => number;
  radius: (n?: number) => number;
  text: {
    title: TextStyle & {
      fontSize: number;
    };
    title2: TextStyle & {
      fontSize: number;
    };
    subtitle: TextStyle & {
      fontSize: number;
    };
    subtitle2: TextStyle & {
      fontSize: number;
    };
    body: TextStyle & {
      fontSize: number;
    };
    body2: TextStyle & {
      fontSize: number;
    };
    button: TextStyle & {
      fontSize: number;
      textTransform: string;
      fontWeight: string;
    };
  };
  palette: {
    primary: {
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
      600: string;
      700: string;
      800: string;
      900: string;
      light: string;
      main: string;
      dark: string;
      contrast: string;
    };
    secondary: {
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
      600: string;
      700: string;
      800: string;
      900: string;
      light: string;
      main: string;
      dark: string;
      contrast: string;
    };
    danger: {
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
      600: string;
      700: string;
      800: string;
      900: string;
      light: string;
      main: string;
      dark: string;
      contrast: string;
    };
    success: {
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
      600: string;
      700: string;
      800: string;
      900: string;
      light: string;
      main: string;
      dark: string;
      contrast: string;
    };
    greys: {
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
      600: string;
      700: string;
      800: string;
      900: string;
      light: string;
      main: string;
      dark: string;
    };
    white: string;
    black: string;
    background: {
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
      600: string;
      700: string;
      800: string;
      900: string;
      light: string;
      main: string;
      dark: string;
    };
    text: {
      primary: string;
      secondary: string;
      button: string;
    };
  };
  shadows: Shadow[];
}

type Shadow = {
  shadowColor: string;
  shadowOffset: {
    width: number;
    height: number;
  };
  shadowOpacity: number;
  shadowRadius: number;
  elevation: number;
};
