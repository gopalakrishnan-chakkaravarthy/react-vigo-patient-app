import * as React from 'react';
import {ActivityIndicator, Colors} from 'react-native-paper';
import {View, StyleSheet} from 'react-native';
function LoadingIndicator() {
  return (
    <View style={styles.container}>
      <ActivityIndicator
        style={styles.loader}
        animating={true}
        color={Colors.blueA100}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loader: {
    marginTop: '50%',
  },
});

export default LoadingIndicator;
