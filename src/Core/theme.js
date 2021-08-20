import {configureFonts, DefaultTheme, DarkTheme} from 'react-native-paper';
const fontConfig = {
  default: {
    regular: {
      fontFamily: 'roboto',
      fontWeight: 'normal',
      fontSize: 10, // <-- Try using this but not work
    },
    medium: {
      fontFamily: 'roboto',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'roboto',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'roboto',
      fontWeight: 'normal',
    },
  },
};
export const defaultTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    text: '#000000',
    primary: '#560CCE',
    secondary: '#414757',
    error: '#f13a59',
  },
};

export const customTheme = {
  fonts: configureFonts(fontConfig),
  ...DefaultTheme,
  colors: {
    primary: '#1f3a93',
    accent: '#19b5fe',
    background: 'white',
    surface: '#6bb9f0',
    text: '#001021',
    error: '#B71F0E',
    disabled: '#BEC6C6',
    placeholder: '#1481BA',
    backdrop: '#001021',
  },
};
