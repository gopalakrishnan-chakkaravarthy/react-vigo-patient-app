import React from 'react';
import View from 'react-native';
import DialogAlert from '../../Reusables/DialogAlert';
import AppListView from '../../Reusables/AppListView';
import DataManager from '../../Providers/DataManager ';
import BaseHttpService from '../../Providers/BaseHttpService';
import {ApiUrls} from '../../Constants/ApiUrls';
import {AppGlobalConstants} from '../../Constants/AppGlobalConstants';
import {MessageConstants} from '../../Constants/MessageConstants';
import LoadingIndicator from '../../Reusables/LoadingIndicator';
import HelperService from '../../Helpers/HelperService';
import withUnmounted from '@ishawnwang/withunmounted';
class MedicalBillList extends React.Component {
  listRows = [];
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: {
        header: {},
        rows: [],
      },
    };
  }
  componentDidMount() {
    this.loadItems();
  }
  componentWillUnmount() {}
  onListClick = selectedItem => {
    debugger;
  };
  // onSearchChange = $event => {
  //   debugger;
  //   const filteredResult = HelperService.filterItems(
  //     this.listRows,
  //     'title',
  //     $event,
  //   );
  //   this.setState({
  //     dataSource: filteredResult,
  //     isLoading: false,
  //   });
  // };
  loadItems() {
    const loginName = DataManager.GetItem(AppGlobalConstants?.loginName);
    const apiUrl = ApiUrls.medicalBillList + loginName;

    BaseHttpService.get(apiUrl, (_, response) => {
      if (!this.hasUnmounted) {
        this.listRows = response;
        const dataSource = {
          header: {
            title: 'Medical Bills',
            subTitle: 'View List Of Available Bills',
            icon: 'file-eye-outline',
          },
          rows: this.listRows,
        };
        this.setState({
          dataSource: dataSource,
          isLoading: false,
        });
      }
    }).catch(error => {
      if (!this.hasUnmounted) {
        this.setState({isLoading: false});
      }

      DialogAlert.openAlert(MessageConstants.noRecordsfound);
    });
  }
  render() {
    if (this.state.isLoading) {
      return <LoadingIndicator />;
    }
    return (
      <AppListView
        dataSource={this.state.dataSource}
        onListClick={this.onListClick}></AppListView>
    );
  }
}
export default withUnmounted(MedicalBillList);
