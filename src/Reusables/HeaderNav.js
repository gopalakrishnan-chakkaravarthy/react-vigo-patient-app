import * as React from 'react';
import {Appbar, Dialog, Portal, Provider} from 'react-native-paper';
import {StyleSheet, ScrollView} from 'react-native';
import {ApiConfig} from '../Config/ApiConfig';
import {ColorConstant} from '../Constants/ColorConstant';
import {AppGlobalConstants} from '../Constants/AppGlobalConstants';
import {DataManager, AppStateManager} from '../Providers/index';
import PatientQr from '../View/Account/PatientQr';
export default function CustomNavigationBar({navigation}) {
  const [openQr, setQr] = React.useState(false);
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
  if (!DataManager?.isLoggedIn()) {
    return null;
  }
  // if (openQr) {
  //   return (
  //     <Provider>
  //       <Portal>
  //         <Dialog visible={openQr}>
  //           <Dialog.ScrollArea style={styles.qrContainer}>
  //             <ScrollView contentContainerStyle={styles.qrContainer}>
  //               <PatientQr></PatientQr>
  //             </ScrollView>
  //           </Dialog.ScrollArea>
  //         </Dialog>
  //       </Portal>
  //     </Provider>
  //   );
  // }
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
  qrContainer: {flex: 1, flexDirection: 'row', height: '70%'},
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
