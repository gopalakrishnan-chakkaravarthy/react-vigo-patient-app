import React from 'react';
import {View, ScrollView} from 'react-native';
import {Text} from 'react-native-paper';
import BaseHttpService from '../../Providers/BaseHttpService';
import {ApiUrls} from '../../Constants/ApiUrls';
import {MessageConstants} from '../../Constants/MessageConstants';
import {GlobalStyle} from '../../Styles/GlobalStyle';
import {DialogAlert, LoadingIndicator} from '../../Reusables/index';
import withUnmounted from '@ishawnwang/withunmounted';
class MedicalBillDetails extends React.Component {
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
    const apiUrl = ApiUrls.medcialBillDetail + this.props?.id;
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
  getBillDetail() {
    if (this.state?.dataSource?.length === 0) {
      return <View key="no_Records">No records found</View>;
    }
    let billDetail = [
      <View style={GlobalStyle.detailRow} key="bill_Header_Row">
        <Text style={GlobalStyle.detailHeaderColLeftAlign} key="header_Col1">
          Item
        </Text>
        <Text style={GlobalStyle.detailHeaderCol} key="header_Col2">
          Unit Price
        </Text>
        <Text style={GlobalStyle.detailHeaderCol} key="header_Col3">
          Quantity
        </Text>
        <Text style={GlobalStyle.detailHeaderCol} key="header_Col4">
          Price
        </Text>
        <Text style={GlobalStyle.detailHeaderCol} key="header_Col5">
          Tax
        </Text>
      </View>,
    ];
    for (let index = 0; index < this.state?.dataSource?.length; index++) {
      billDetail.push(
        <View style={GlobalStyle.detailRow} key={'bill_row_' + index}>
          <Text style={GlobalStyle.detailColLeftAlign} key={'col1_' + index}>
            {this.state?.dataSource[index]?.drugName}
          </Text>
          <Text style={GlobalStyle.detailCol} key={'col2_' + index}>
            {this.state?.dataSource[index]?.unitPrice}
          </Text>
          <Text style={GlobalStyle.detailCol} key={'col3_' + index}>
            {this.state?.dataSource[index]?.quantity}
          </Text>
          <Text style={GlobalStyle.detailCol} key={'col4_' + index}>
            {this.state?.dataSource[index]?.itemCost}
          </Text>
          <Text style={GlobalStyle.detailCol} key={'col5_' + index}>
            {this.state?.dataSource[index]?.taxValue}
          </Text>
        </View>,
      );
    }
    return billDetail;
  }
  render() {
    if (this.state.isLoading) {
      return <LoadingIndicator />;
    }
    return (
      <ScrollView style={GlobalStyle.detailContainer}>
        {this.getBillDetail()}
      </ScrollView>
    );
  }
}
export default withUnmounted(MedicalBillDetails);
