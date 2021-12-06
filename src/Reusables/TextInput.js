import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {TextInput as Input} from 'react-native-paper';
import {defaultTheme} from '../Core/theme';

export default function TextInput({errorText, description, ...props}) {
  return (
    <View style={styles.container}>
      <Input
        style={styles.input}
        selectionColor={defaultTheme.colors.primary}
        underlineColor="transparent"
        mode="flat"
        {...props}
      />
      {description && !errorText ? (
        <Text style={styles.description}>{description}</Text>
      ) : null}
      {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '80%',
    marginVertical: 12,
  },
  input: {
    backgroundColor: defaultTheme.colors.surface,
    borderBottomWidth: 1,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    borderBottomColor: '#cccc'
  },
  description: {
    fontSize: 13,
    color: defaultTheme.colors.secondary,
    paddingTop: 8,
  },
  error: {
    fontSize: 13,
    color: defaultTheme.colors.error,
    paddingTop: 8,
  },
});
