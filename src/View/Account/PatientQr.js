import React from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {Text, Divider} from 'react-native-paper';
import withUnmounted from '@ishawnwang/withunmounted';
import QRCode from 'react-native-qrcode-svg';
import {Background, Button} from '../../Reusables/index';
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
        <View key={'qr_row_' + index}>
          <Text key={'name_' + index} style={styles.qrTitle}>
            {this.state?.dataSource[index]?.patientname}
          </Text>
          <Divider />
          <QRCode key={'qrCode_' + index} value={qrString} size={300} />
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
  closeButton: {
    backgroundColor: ColorConstant.iconBackgroundColor,
    width: '80%',
  },
  qrTitle: {
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: 'bold',
    fontSize: 10,
    color: ColorConstant.fontTitleColor,
  },
});
