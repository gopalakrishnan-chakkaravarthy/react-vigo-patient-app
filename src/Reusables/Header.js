import React from 'react';
import {StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';
import {ColorConstant} from '../Constants/ColorConstant';

export default function Header(props) {
  return <Text style={styles.header} {...props} />;
}

const styles = StyleSheet.create({
  header: {
    fontSize: 18,
    fontStyle:'italic',
    color: ColorConstant.backgroundColor,
    fontWeight: 'bold',
    paddingVertical: 12
  },
});
