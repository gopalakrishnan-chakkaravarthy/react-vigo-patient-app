import * as React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {List, Title, Subheading, Text} from 'react-native-paper';
import {ColorConstant} from '../Constants/ColorConstant';
export default class AppListView extends React.Component {
  constructor(props) {
    super(props);
  }
  onListClick = selectedItem => {
    debugger;
    this.props.onListClick(selectedItem);
  };
  createListBody = () => {
    let listBody = [];
    for (let index = 0; index < this.props?.dataSource?.rows?.length; index++) {
      listBody.push(
        <List.Item
          style={styleSheet.listSize}
          onPress={() => this.onListClick(this.props?.dataSource?.rows[index])}
          key={'listBody_' + index}
          left={() => (
            <List.Icon
              icon="clipboard-list-outline"
              color={styleSheet.listIconColor.color}
            />
          )}
          right={() => (
            <List.Icon
              icon="chevron-right"
              color={styleSheet.listIconColor.color}
            />
          )}
          title={
            <Title style={styleSheet.listTitleFont} numberOfLines={5}>
              {this.props?.dataSource?.rows[index]?.title}
            </Title>
          }
          description={
            <Subheading style={styleSheet.listSubTitleFont} numberOfLines={5}>
              {this.props?.dataSource?.rows[index]?.subTitle}
            </Subheading>
          }
        />,
      );
    }
    return listBody;
  };
  render() {
    if (this.props?.dataSource?.rows?.length > 0) {
      return <ScrollView>{this.createListBody()}</ScrollView>;
    }
    return <Text>No Records Found</Text>;
  }
}
const styleSheet = StyleSheet.create({
  listTitleFont: {
    fontSize: 12,
    color: ColorConstant.fontTitleColor,
  },
  listSubTitleFont: {
    fontSize: 10,
    fontStyle: 'italic',
  },
  listSize: {
    height: 65,
  },
  listIconColor: {
    color: ColorConstant.iconColor,
  },
});
