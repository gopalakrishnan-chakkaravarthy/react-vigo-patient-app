import React from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {Divider} from 'react-native-paper';
import withUnmounted from '@ishawnwang/withunmounted';
import QRCode from 'react-native-qrcode-svg';
import {Background, Button, AppCardTitle} from '../../Reusables/index';
import {AppGlobalConstants} from '../../Constants/AppGlobalConstants';
import {ColorConstant} from '../../Constants/ColorConstant';
import {DataManager, HelperService} from '../../Providers/index';
import {GlobalStyle} from '../../Styles/GlobalStyle';
class PatientQr extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: undefined,
      openQr: false,
    };
  }
  componentDidMount() {
    if (!this.hasUnmounted) {
      this.setState({
        dataSource: DataManager.GetItem(
          AppGlobalConstants.patientListForContact,
        ),
      });
    }
  }
  goBack() {
    const {navigation} = this.props;
    if (HelperService?.isLoggedIn) {
      navigation.reset({
        index: 0,
        routes: [{name: AppGlobalConstants.Routes.Dashboard}],
      });
      return;
    }
    HelperService.logoutIfUserIsInvalid(navigation);
  }
  generateQrCodes() {
    let qrCodes = [];
    for (let index = 0; index < this.state?.dataSource?.length; index++) {
      let qrCodeValue = [AppGlobalConstants.qrCodePatientPrefix];
      for (
        let indexQr = 0;
        indexQr < AppGlobalConstants.qrDataOccurance;
        indexQr++
      ) {
        qrCodeValue.push(this.state?.dataSource[index]?.patientid);
      }
      const qrString = qrCodeValue.join(',');
      qrCodes.push(
        <View key={'qr_row_' + index} style={styles.viewItem}>
          <AppCardTitle
            key={'name_' + index}
            title={this.state?.dataSource[index]?.patientname}
            subtitle={'PT'+this.state?.dataSource[index]?.patientid}
            icon="account-key"></AppCardTitle>
          <Divider />
          <QRCode key={'qrCode_' + index} value={qrString} size={200} />
        </View>,
      );
    }

    return qrCodes;
  }
  render() {
    return (
      <Background>
        <ScrollView contentContainerStyle={GlobalStyle.modalContainer}>
          {this.generateQrCodes()}
        </ScrollView>
        <Button
          style={styles.closeButton}
          mode="outline"
          icon="keyboard-backspace"
          color={ColorConstant.backgroundColor}
          onPress={() => this.goBack()}>
          Back
        </Button>
      </Background>
    );
  }
}
export default withUnmounted(PatientQr);
const styles = StyleSheet.create({
  viewItem:{
    borderWidth:1,
    borderColor:ColorConstant.backgroundColor,
    alignItems:'center',
    justifyContent:'flex-start',
    backgroundColor:'#fff',
    borderRadius:15,
    top:'10%',
    height:'65%',
    width:'65%'
  },
  qrContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButton: {
    backgroundColor: ColorConstant.iconBackgroundColor,
    width: '80%',
  }
});
