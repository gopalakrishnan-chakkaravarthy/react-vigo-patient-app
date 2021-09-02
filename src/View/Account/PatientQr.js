import React from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {Dialog, Portal, Provider} from 'react-native-paper';
import withUnmounted from '@ishawnwang/withunmounted';
import QRCode from 'react-native-qrcode-svg';
import {AppGlobalConstants} from '../../Constants/AppGlobalConstants';
import {ColorConstant} from '../../Constants/ColorConstant';
import {DataManager} from '../../Providers/index';

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
      this.setState({openQr: true});
    }
  }
  onModalClose() {
    this.setState({openQr: false});
    this.props.onModalClose();
  }
  generateQrCodes() {
    let qrCodes = [];

    for (let index = 0; index < this.state?.dataSource?.length; index++) {
      let qrCodeValue = [AppGlobalConstants.qrCodePatientPrefix];
      for (let index = 0; index < AppGlobalConstants.qrDataOccurance; index++) {
        qrCodeValue.push(this.state?.dataSource[index]?.patientid);
      }
      const qrString = qrCodeValue.join(',');
      qrCodes.push(
        <View key={'qr_row_' + index}>
          <Text style={styles.qrCodeRow} key={'name_' + index}>
            {this.state?.dataSource[index]?.patientname}
          </Text>
          <QRCode
            style={styles.qrCodeRow}
            key={'qrCode_' + index}
            value={qrString}
          />
        </View>,
      );
    }

    return qrCodes;
  }
  render() {
    return (
      <Provider>
        <Portal>
          <Dialog visible={this.state.openQr}>
            <Dialog.ScrollArea>
              <ScrollView contentContainerStyle={styles.qrContainer}>
                {this.generateQrCodes()}
                <Button
                  style={style.closeButton}
                  mode="outline"
                  icon="close"
                  color={ColorConstant.backgroundColor}
                  onPress={() => this.onModalClose()}>
                  Close
                </Button>
              </ScrollView>
            </Dialog.ScrollArea>
          </Dialog>
        </Portal>
      </Provider>
    );
  }
}
export default withUnmounted(PatientQr);
const styles = StyleSheet.create({
  qrContainer: {flex: 1, flexDirection: 'row'},
  qrCodeRow: {
    width: '100%',
    alignContent: 'center',
    marginBottom: 0.5,
  },
  closeButton: {
    backgroundColor: ColorConstant.iconBackgroundColor,
  },
});
