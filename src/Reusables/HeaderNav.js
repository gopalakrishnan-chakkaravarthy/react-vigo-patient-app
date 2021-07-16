import * as React from 'react';
import {Appbar, Avatar} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import {ApiConfig} from '../Config/ApiConfig';
import {AppGlobalConstants} from '../Constants/AppGlobalConstants';
export default class HeaderNav extends React.Component {
  constructor(props) {
    super(props);
  }
  logOut = () => {
    debugger;
    const {navigation} = this.props;
    navigation.reset({
      index: 0,
      routes: [{name: AppGlobalConstants.Routes.LoginScreen}],
    });
  };
  render() {
    if (!this.props?.visible) {
      return null;
    }
    return (
      <Appbar style={styles.top}>
        <Appbar.Content
          title={ApiConfig.clientName}
          subtitle={ApiConfig.clientSubTitle}
        />
        <Avatar.Text size={24} label="XD" />
        <Appbar.Action
          icon="account"
          onPress={() => console.log('Pressed account')}
        />
        <Appbar.Action
          icon="notification-clear-all"
          onPress={() => console.log('Pressed notification-clear-all')}
        />
        <Appbar.Action icon="logout" onPress={this.logOut} />
      </Appbar>
    );
  }
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
  },
});
