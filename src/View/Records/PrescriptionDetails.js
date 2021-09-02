import React from 'react';
import {View, ScrollView} from 'react-native';
import {Text} from 'react-native-paper';
import BaseHttpService from '../../Providers/BaseHttpService';
import {ApiUrls} from '../../Constants/ApiUrls';
import {MessageConstants} from '../../Constants/MessageConstants';
import {GlobalStyle} from '../../Styles/GlobalStyle';
import {DialogAlert, LoadingIndicator} from '../../Reusables/index';
import withUnmounted from '@ishawnwang/withunmounted';
class PrescriptionDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: undefined,
    };
  }
  componentDidMount() {
    this.loadDetails();
  }
  loadDetails() {
    const apiUrl = ApiUrls.prescriptionDetail + this.props?.id;
    BaseHttpService.get(apiUrl, (_, response) => {
      if (!this.hasUnmounted) {
        this.setState({
          dataSource: response,
          isLoading: false,
        });
      }
    }).catch(() => {
      if (!this.hasUnmounted) {
        this.setState({isLoading: false});
      }
      DialogAlert.openAlert(MessageConstants.noRecordsfound);
    });
  }
  getPrescriptionDetail() {
    if (this.state?.dataSource?.length === 0) {
      return <View key="no_Records">No records found</View>;
    }
    let prescriptionDetail = [
      <View style={GlobalStyle.detailRow} key="hdr_Header_Row">
        <Text style={GlobalStyle.detailHeaderColLeftAlign} key="header_Col1">
          Item
        </Text>
        <Text style={GlobalStyle.detail20PercentHeaderCol} key="header_Col2">
          Strength
        </Text>
        <Text style={GlobalStyle.detail20PercentHeaderCol} key="header_Col3">
          Quantity
        </Text>
        <Text style={GlobalStyle.detail20PercentHeaderCol} key="header_Col4">
          Frequency
        </Text>
        <Text style={GlobalStyle.detail20PercentHeaderCol} key="header_Col5">
          Notes
        </Text>
      </View>,
    ];
    for (let index = 0; index < this.state?.dataSource?.length; index++) {
      prescriptionDetail.push(
        <View style={GlobalStyle.detailRow} key={'prec_row_' + index}>
          <Text
            style={GlobalStyle.detailCol20PercentLeftAlign}
            key={'col1_' + index}>
            {this.state?.dataSource[index]?.drugName}
          </Text>
          <Text style={GlobalStyle.detailCol20Percent} key="col2_">
            {this.state?.dataSource[index]?.strength
              ? this.state?.dataSource[index]?.strength
              : '--'}
          </Text>
          <Text style={GlobalStyle.detailCol20Percent} key={'col3_' + index}>
            {this.state?.dataSource[index]?.medicineCount}
          </Text>
          <Text
            style={GlobalStyle.detailCol20Percent}
            key={'col4_' + index}
            numberOfLines={1}
            ellipsizeMode="tail">
            {this.state?.dataSource[index]?.frequency}
          </Text>
          <Text
            style={GlobalStyle.detailCol20Percent}
            key={'col5_' + index}
            numberOfLines={1}
            ellipsizeMode="tail">
            {this.state?.dataSource[index]?.instructions}
          </Text>
        </View>,
      );
    }
    return prescriptionDetail;
  }
  render() {
    if (this.state.isLoading) {
      return <LoadingIndicator />;
    }
    return (
      <ScrollView style={GlobalStyle.detailContainer}>
        {this.getPrescriptionDetail()}
      </ScrollView>
    );
  }
}
export default withUnmounted(PrescriptionDetails);
