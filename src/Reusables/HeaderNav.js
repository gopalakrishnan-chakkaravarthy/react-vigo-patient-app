import * as React from 'react';
import {Appbar} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import {ApiConfig} from '../Config/ApiConfig';
import {ColorConstant} from '../Constants/ColorConstant';
import {AppGlobalConstants} from '../Constants/AppGlobalConstants';
import DataManager from '../Providers/DataManager ';
export default function CustomNavigationBar({navigation}) {
  const handleLogout = () => {
    DataManager.clear();
    navigation.reset({
      index: 0,
      routes: [{name: AppGlobalConstants.Routes.LoginScreen}],
    });
  };
  if (!DataManager?.isLoggedIn()) {
    return null;
  }
  return (
    <Appbar style={styles.top}>
      <Appbar.Content
        title={ApiConfig.clientName}
        subtitle={ApiConfig.clientSubTitle}
        color={ColorConstant.fontTitleColor}
      />

      <Appbar.Action
        icon="account"
        color={ColorConstant.fontTitleColor}
        onPress={() => console.log('Pressed account')}></Appbar.Action>
      <Appbar.Action
        icon="qrcode"
        color={ColorConstant.fontTitleColor}
        onPress={() => console.log('Qr Code pressed')}
      />
      <Appbar.Action
        color={ColorConstant.fontTitleColor}
        icon="logout"
        onPress={handleLogout}
      />
    </Appbar>
  );
}
const styles = StyleSheet.create({
  top: {
    position: 'relative',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
    backgroundColor: ColorConstant.backgroundColor,
  },
});
