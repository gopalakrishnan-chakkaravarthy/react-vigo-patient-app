import React from 'react';
import {View, StyleSheet, KeyboardAvoidingView} from 'react-native';
import {defaultTheme} from '../Core/theme';

export default function Background({children}) {
  return (
    <View style={styles.background}>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        {children}
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    backgroundColor: defaultTheme.colors.surface,
  },
  container: {
    flex: 1,
    padding: 2,
    width: '100%',
    maxWidth: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
