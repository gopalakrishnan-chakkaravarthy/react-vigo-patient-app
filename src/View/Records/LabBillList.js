import React from 'react';
import {ScrollView} from 'react-native';
import {Dialog, Portal, Provider} from 'react-native-paper';
import DataManager from '../../Providers/DataManager';
import Button from '../../Reusables/Button';
import LaboratoryDetails from '../Common/LaboratoryDetails';
import BaseHttpService from '../../Providers/BaseHttpService';
import {ApiUrls} from '../../Constants/ApiUrls';
import {ColorConstant} from '../../Constants/ColorConstant';
import {AppGlobalConstants} from '../../Constants/AppGlobalConstants';
import {GlobalStyle} from '../../Styles/GlobalStyle';
import {MessageConstants} from '../../Constants/MessageConstants';
import LabBillDetails from './LabBillDetails';
import BillDetailHeader from '../Common/BillDetailHeader';
import {
  DialogAlert,
  AppListView,
  LoadingIndicator,
} from '../../Reusables/index';
import withUnmounted from '@ishawnwang/withunmounted';
class LabBillList extends React.Component {
  listRows = [];
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      dataSource: {
        header: {},
        rows: [],
      },
      details: {id: '', name: '', date: '', amount: ''},
      openDetails: false,
    };
  }
  componentDidMount() {
    this.loadItems();
  }
  onListClick = selectedItem => {
    if (!this.state?.openDetails) {
      const details = {
        id: selectedItem?.id,
        name: selectedItem?.title,
        date: selectedItem?.date,
        amount: selectedItem?.subTitle,
      };
      this.setState({details: details});
      this.setState({openDetails: true});
    }
  };
  onModalClose() {
    this.setState({openDetails: false});
  }
  renderDetails() {
    return (
      <Provider>
        <Portal>
          <Dialog visible={this.state.openDetails}>
            <Dialog.ScrollArea>
              <ScrollView contentContainerStyle={GlobalStyle.modalContainer}>
                <LaboratoryDetails />
                <BillDetailHeader
                  billPrefix="LB"
                  id={this.state?.details?.id}
                  name={this.state?.details?.name}
                  amount={this.state?.details?.amount}
                  date={this.state?.details?.date}></BillDetailHeader>
                <LabBillDetails id={this.state?.details?.id}></LabBillDetails>
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
  loadItems() {
    const loginName = DataManager.GetItem(AppGlobalConstants?.loginName);
    const apiUrl = ApiUrls.laboratoryBillList + loginName;

    BaseHttpService.get(apiUrl, (_, response) => {
      if (!this.hasUnmounted) {
        this.listRows = response;
        const dataSource = {
          header: {
            title: 'Laboratory Bills',
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
  renderListOnLoad() {
    return (
      <AppListView
        dataSource={this.state.dataSource}
        onListClick={this.onListClick}></AppListView>
    );
  }
  render() {
    if (this.state.isLoading) {
      return <LoadingIndicator />;
    }
    if (!this.state?.openDetails) {
      return this.renderListOnLoad();
    }
    if (this.state?.openDetails) {
      return this.renderDetails();
    }
  }
}
export default withUnmounted(LabBillList);
const style = {
  closeButton: {
    backgroundColor: ColorConstant.iconBackgroundColor,
  },
};
