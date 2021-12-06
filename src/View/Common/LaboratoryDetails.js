import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Paragraph, Avatar} from 'react-native-paper';
import DialogAlert from '../../Reusables/DialogAlert';
import {AppStateManager, BaseHttpService} from '../../Providers/index';
import {ColorConstant} from '../../Constants/ColorConstant';
import {ApiUrls} from '../../Constants/ApiUrls';
import {StateKeys} from '../../Constants/StateKeys';
import {GlobalStyle} from '../../Styles/GlobalStyle';
import withUnmounted from '@ishawnwang/withunmounted';
class LaboratoryDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: undefined,
    };
  }
  componentDidMount() {
    const data = AppStateManager.Get(StateKeys?.headers?.pharmacyHeader);
    if (data) {
      this.setState({
        dataSource: data,
      });
      return;
    }
    this.loadHeader();
  }
  loadHeader() {
    BaseHttpService.get(ApiUrls.laboratoryDetail, (_, response) => {
      if (!this.hasUnmounted) {
        this.setState({
          dataSource: response,
        });
        AppStateManager.Set(StateKeys?.headers?.pharmacyHeader, response);
      }
    }).catch(error => {
      DialogAlert.openAlert(MessageConstants.noRecordsfound);
    });
  }
  render() {
    return (
      <View style={GlobalStyle.contactHeader}>
        <Paragraph style={GlobalStyle.fontBoldItalic}>
          {this.state.dataSource?.labName}
        </Paragraph>
        <Paragraph style={GlobalStyle.fontBoldItalic}>
          {this.state.dataSource?.labAddress}
        </Paragraph>
        <Paragraph style={GlobalStyle.fontItalic}>
          <Avatar.Icon
            icon="email"
            color={ColorConstant.fontTitleColor}
            size={20}
            style={styles.detailIcon}
          />
          {this.state.dataSource?.email}
        </Paragraph>

        <Paragraph style={GlobalStyle.fontItalic}>
          <Avatar.Icon
            icon="card-account-phone"
            color={ColorConstant.fontTitleColor}
            size={20}
            style={styles.detailIcon}
          />
          {this.state.dataSource?.phone}
        </Paragraph>
      </View>
    );
  }
}
export default withUnmounted(LaboratoryDetails);

const styles = StyleSheet.create({
  detailIcon: {
    paddingTop: 10,
    backgroundColor: ColorConstant.iconBackgroundColor,
  },
});
