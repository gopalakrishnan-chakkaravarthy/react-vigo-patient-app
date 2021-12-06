import * as React from 'react';
import {Appbar} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import {ApiConfig} from '../Config/ApiConfig';
import {ColorConstant} from '../Constants/ColorConstant';
import {AppGlobalConstants} from '../Constants/AppGlobalConstants';
import {HelperService} from '../Providers/index';
export default function CustomNavigationBar({navigation}) {
  const handleLogout = () => {
    HelperService.logoutIfUserIsInvalid(navigation);
  };
  const displayQr = () => {
    navigation.reset({
      index: 0,
      routes: [{name: AppGlobalConstants.Routes.PatientQr}],
    });
  };
  if (!HelperService?.isLoggedIn) {
    return null;
  }
  return (
    <Appbar style={styles.top}>
      <Appbar.Content
        title={ApiConfig.clientName}
        subtitle={ApiConfig.clientSubTitle}
        color={ColorConstant.white}
      />

      {/* <Appbar.Action
        icon="account"
        color={ColorConstant.white}
        onPress={() => console.log('Pressed account')}></Appbar.Action> */}
      <Appbar.Action
        icon="qrcode"
        color={ColorConstant.white}
        onPress={displayQr}
      />
      <Appbar.Action
        color={ColorConstant.white}
        icon="logout"
        onPress={handleLogout}
      />
    </Appbar>
  );
}
const styles = StyleSheet.create({
  qrContainer: {flex: 1, flexDirection: 'row', height: '100%'},
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
