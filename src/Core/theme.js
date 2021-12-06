import {configureFonts, DefaultTheme, DarkTheme} from 'react-native-paper';
const fontConfig = {
  default: {
    regular: {
      fontWeight: 'normal',
      fontSize: 10, // <-- Try using this but not work
    },
    medium: {
      fontWeight: 'normal',
    },
    light: {
      fontWeight: 'normal',
    },
    thin: {
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
    primary: '#d35400',
    accent: '#f27935',
    background: 'white',
    surface: '#e47833',
    text: '#2f3839',
    error: '#B71F0E',
    disabled: '#BEC6C6',
    placeholder: '#d35400',
    backdrop: '#fde3a7',
  },
};
