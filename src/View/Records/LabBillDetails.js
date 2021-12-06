import React from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';
import BaseHttpService from '../../Providers/BaseHttpService';
import {ApiUrls} from '../../Constants/ApiUrls';
import {ColorConstant} from '../../Constants/ColorConstant';
import {MessageConstants} from '../../Constants/MessageConstants';
import {GlobalStyle} from '../../Styles/GlobalStyle';
import {DialogAlert, LoadingIndicator} from '../../Reusables/index';
import withUnmounted from '@ishawnwang/withunmounted';
class LabBillDetails extends React.Component {
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
    const apiUrl = ApiUrls.laboratoryBillDetail + this.props?.id;
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
        <Text style={styles.detailHeaderColLeftAlign} key="header_Col1">
          Display Name
        </Text>
        <Text style={styles.detailHeaderCol} key="header_Col2">
          Price
        </Text>
        <Text style={styles.detailHeaderCol} key="header_Col3">
          Tax
        </Text>
      </View>,
    ];
    for (let index = 0; index < this.state?.dataSource?.length; index++) {
      billDetail.push(
        <View style={GlobalStyle.detailRow} key={'bill_row_' + index}>
          <Text style={styles.detailColLeftAlign} key={'col1_' + index}>
            {this.state?.dataSource[index]?.displayName
              ? this.state?.dataSource[index]?.displayName
              : this.state?.dataSource[index]?.testName}
          </Text>
          <Text style={styles.detailCol} key={'col2_' + index}>
            {this.state?.dataSource[index]?.itemCost}
          </Text>
          <Text style={styles.detailCol} key={'col3_' + index}>
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
export default withUnmounted(LabBillDetails);

const styles = StyleSheet.create({
  detailHeaderColLeftAlign: {
    borderColor: '#e8e8e8',
    borderWidth: 0,
    borderBottomWidth: 0.6,
    width: '33%',
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: 10,
    color: ColorConstant.fontTitleColor
  },
  detailHeaderCol: {
    borderColor: '#e8e8e8',
    borderWidth: 0,
    borderBottomWidth: 0.6,
    width: '33%',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 10,
    color: ColorConstant.fontTitleColor
  },
  detailColLeftAlign: {
    borderColor: '#e8e8e8',
    borderWidth: 0,
    borderBottomWidth: 0.6,
    width: '33%',
    textAlign: 'left',
    fontSize: 10
  },
  detailCol: {
    borderColor: '#e8e8e8',
    borderWidth: 0,
    borderBottomWidth: 0.6,
    width: '33%',
    textAlign: 'center',
    fontSize: 10
  },
});
