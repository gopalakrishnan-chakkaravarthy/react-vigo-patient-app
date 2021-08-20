import React from 'react';
import {StyleSheet} from 'react-native';
import Background from '../Reusables/Background';
import Logo from '../Reusables/Logo';
import Header from '../Reusables/Header';
import Button from '../Reusables/Button';
import TextInput from '../Reusables/TextInput';
import {MobileNumberValidator} from '../Helpers/MobileNumberValidator';
import {PasswordValidator} from '../Helpers/PasswordValidator';
import {AppGlobalConstants} from '../Constants/AppGlobalConstants';
import {MessageConstants} from '../Constants/MessageConstants';
import BaseHttpService from '../Providers/BaseHttpService';
import {ColorConstant} from '../Constants/ColorConstant';
import {ApiUrls} from '../Constants/ApiUrls';
import {ApiConfig} from '../Config/ApiConfig';
import DataManager from '../Providers/DataManager ';
import {DialogAlert, LoadingIndicator} from '../Reusables/index';
import withUnmounted from '@ishawnwang/withunmounted';
class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      mobile: {value: '', error: ''},
      password: {value: '', error: ''},
    };
    this.validateIfLoggedIn();
  }
  validateIfLoggedIn() {
    const userToken = DataManager.GetItem(AppGlobalConstants.userToken);
    if (userToken) {
      const {navigation} = this.props;
      navigation.reset({
        index: 0,
        routes: [{name: AppGlobalConstants.Routes.Dashboard}],
      });
    }
  }
  onLoginPressed = () => {
    const mobileError = MobileNumberValidator(this.state.mobile.value);
    const passwordError = PasswordValidator(this.state.password.value);
    if (mobileError || passwordError) {
      this.setState({
        mobile: {value: this.state.mobile.value, error: mobileError},
      });
      this.setState({
        pasword: {value: this.state.password.value, error: passwordError},
      });
      return;
    }
    const {navigation} = this.props;
    const loginData = {
      userName: this.state.mobile.value,
      password: this.state.password.value,
    };
    this.setState({
      isLoading: true,
    });
    BaseHttpService.post(ApiUrls.authenticate, loginData, (_, response) => {
      DataManager.SetItem(AppGlobalConstants.userToken, response?.data?.token);
      DataManager.SetItem(AppGlobalConstants.loginName, loginData?.userName);
      DataManager.setLoginStatus();
      if (!this.hasUnmounted) {
        this.setState({
          isLoading: false,
        });
      }
      navigation.reset({
        index: 0,
        routes: [{name: AppGlobalConstants.Routes.Dashboard}],
      });
    }).catch(error => {
      {
        if (!this.hasUnmounted) {
          this.setState({isLoading: false});
        }
        DataManager.SetItem(AppGlobalConstants.userToken, undefined);
        DialogAlert.openAlert(MessageConstants.loginError);
      }
    });
  };
  render() {
    if (this.state.isLoading) {
      return <LoadingIndicator />;
    }
    return (
      <Background>
        <Logo />
        <Header>{ApiConfig.productName}</Header>
        <TextInput
          label="Mobile"
          returnKeyType="next"
          value={this.state.mobile.value}
          onChangeText={text =>
            this.setState({mobile: {value: text, error: ''}})
          }
          error={!!this.state.mobile.error}
          errorText={this.state.mobile.error}
          autoCapitalize="none"
        />
        <TextInput
          label="Password"
          returnKeyType="done"
          value={this.state.password.value}
          onChangeText={text =>
            this.setState({password: {value: text, error: ''}})
          }
          error={!!this.state.password.error}
          errorText={this.state.password.error}
          secureTextEntry
        />
        <Button
          style={styles.loginButton}
          mode="contained"
          icon="login"
          color={ColorConstant.iconColor}
          onPress={this.onLoginPressed}>
          Login
        </Button>
      </Background>
    );
  }
}
export default withUnmounted(LoginScreen);
const styles = StyleSheet.create({
  loginButton: {
    width: '80%',
    color: ColorConstant.fontTitleColor,
  },
});
