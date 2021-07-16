import React from 'react';
import {StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';
import {defaultTheme} from '../Core/theme';

export default function Header(props) {
  return <Text style={styles.header} {...props} />;
}

const styles = StyleSheet.create({
  header: {
    fontSize: 21,
    color: defaultTheme.colors.primary,
    fontWeight: 'bold',
    paddingVertical: 12,
  },
});
