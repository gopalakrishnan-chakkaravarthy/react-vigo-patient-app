import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Paragraph, Avatar} from 'react-native-paper';
import DialogAlert from '../../Reusables/DialogAlert';
import BaseHttpService from '../../Providers/BaseHttpService';
import {ApiUrls} from '../../Constants/ApiUrls';
import {ColorConstant} from '../../Constants/ColorConstant';
import {GlobalStyle} from '../../Styles/GlobalStyle';
import withUnmounted from '@ishawnwang/withunmounted';
class PharmacyDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: undefined,
    };
  }
  componentDidMount() {
    this.loadHeader();
  }
  // shouldComponentUpdate() {
  //   if (!this.state?.isLoading) {
  //     return false;
  //   }
  // }
  loadHeader() {
    BaseHttpService.get(ApiUrls.pharmacyDetail, (_, response) => {
      if (!this.hasUnmounted) {
        this.setState({
          dataSource: response,
        });
      }
    }).catch(error => {
      DialogAlert.openAlert(MessageConstants.noRecordsfound);
    });
  }
  render() {
    return (
      <View style={GlobalStyle.contactHeader}>
        <Paragraph style={GlobalStyle.fontBoldItalic}>
          {this.state.dataSource?.name}
        </Paragraph>
        <Paragraph style={GlobalStyle.cardDetailFont}>
          {this.state.dataSource?.address}
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
export default withUnmounted(PharmacyDetails);

const styles = StyleSheet.create({
  detailIcon: {
    paddingTop: 10,
    backgroundColor: ColorConstant.iconBackgroundColor,
  },
});
