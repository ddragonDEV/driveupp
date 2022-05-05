import { Theme } from '../models/Theme';

export const light: Theme = {
  name: 'light',
  spacing: (n = 1) => 8 * n,
  radius: (n = 1) => 20 * n,
  text: {
    title: {
      fontSize: 24,
    },
    title2: {
      fontSize: 22,
    },
    subtitle: {
      fontSize: 20,
    },
    subtitle2: {
      fontSize: 18,
    },
    body: {
      fontSize: 18,
    },
    body2: {
      fontSize: 17,
    },
    button: {
      fontSize: 18,
      textTransform: 'capitalize',
      fontWeight: '900',
    },
  },
  palette: {
    greys: {
      100: '#f0f0f0',
      200: '#e0e0e0',
      300: '#d5d5d5',
      400: '#bdbdbd',
      500: '#9e9e9e',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
      light: '#212121',
      main: '#212121',
      dark: '#212121',
    },
    white: '#fcfcfc',
    black: '#282828',
    primary: {
      100: '#ceb2ff',
      200: '#ac7fff',
      300: '#8b4dff',
      400: '#6a1aff',
      500: '#5100e6',
      600: '#3f00b4',
      700: '#2c0082',
      800: '#1a0050',
      900: '#0a0020',
      light: '#8b4dff',
      main: '#6a1aff',
      dark: '#5100e6',
      contrast: '#ffffff',
    },
    secondary: {
      100: '#eab2ff',
      200: '#d97fff',
      300: '#c84cff',
      400: '#b91aff',
      500: '#9f00e6',
      600: '#7c00b4',
      700: '#580082',
      800: '#360050',
      900: '#15001f',
      light: '#b91aff',
      main: '#9f00e6',
      dark: '#7c00b4',
      contrast: '#ffffff',
    },
    danger: {
      100: '#f2c2c2',
      200: '#e39c9c',
      300: '#d77576',
      400: '#ca4f4f',
      500: '#b03535',
      600: '#8a2828',
      700: '#631c1d',
      800: '#3e0f10',
      900: '#1d0202',
      light: '#ca4f4f',
      main: '#b03535',
      dark: '#8a2828',
      contrast: '#ffffff',
    },
    success: {
      100: '#c0eec2',
      200: '#9be19c',
      300: '#75d676',
      400: '#4fca51',
      500: '#35b037',
      600: '#27892a',
      700: '#1b621d',
      800: '#0c3c0e',
      900: '#001600',
      light: '#4fca51',
      main: '#35b037',
      dark: '#27892a',
      contrast: '#ffffff',
    },
    background: {
      100: '#b6fcd7',
      200: '#88f9bd',
      300: '#5cf6a3',
      400: '#36f489',
      500: '#26db70',
      600: '#1baa56',
      700: '#0f7a3d',
      800: '#034924',
      900: '#001909',
      light: '#e2fff0',
      main: '#b6fcd7',
      dark: '#88f9bd',
    },
    text: {
      primary: '#333333',
      secondary: '#8c8c8c',
      button: '#fcfcfc',
    },
  },
  shadows: [
    {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.18,
      shadowRadius: 1.0,

      elevation: 1,
    },
    {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,

      elevation: 2,
    },
    {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,

      elevation: 3,
    },
    {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,

      elevation: 4,
    },
    {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,

      elevation: 5,
    },
    {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.27,
      shadowRadius: 4.65,

      elevation: 6,
    },
    {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.29,
      shadowRadius: 4.65,

      elevation: 7,
    },
    {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 4.65,

      elevation: 8,
    },
    {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.32,
      shadowRadius: 5.46,

      elevation: 9,
    },
    {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.34,
      shadowRadius: 6.27,

      elevation: 10,
    },
  ],
};
