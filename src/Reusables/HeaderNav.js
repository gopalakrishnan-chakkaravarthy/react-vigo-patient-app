import * as React from 'react';
import {Appbar} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import {ApiConfig} from '../Config/ApiConfig';
import {ColorConstant} from '../Constants/ColorConstant';
import {AppGlobalConstants} from '../Constants/AppGlobalConstants';
import {DataManager, AppStateManager} from '../Providers/index';
import PatientQr from '../View/Account/PatientQr';
export default function CustomNavigationBar({navigation}) {
  const [openQr, setQr] = useState(false);
  const handleLogout = () => {
    DataManager.clear();
    AppStateManager.Clear();
    navigation.reset({
      index: 0,
      routes: [{name: AppGlobalConstants.Routes.LoginScreen}],
    });
  };
  onModalClose = () => {
    setQr(false);
  };
  if (openQr) {
    return <PatientQr />;
  }
  if (!DataManager?.isLoggedIn()) {
    return null;
  }
  return (
    <Appbar style={styles.top}>
      <Appbar.Content
        title={ApiConfig.clientName}
        subtitle={ApiConfig.clientSubTitle}
        color={ColorConstant.white}
      />

      <Appbar.Action
        icon="account"
        color={ColorConstant.white}
        onPress={() => console.log('Pressed account')}></Appbar.Action>
      <Appbar.Action
        icon="qrcode"
        color={ColorConstant.white}
        onPress={() => setQr(true)}
      />
      <Appbar.Action
        color={ColorConstant.white}
        icon="logout"
        onPress={() => handleLogout}
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
