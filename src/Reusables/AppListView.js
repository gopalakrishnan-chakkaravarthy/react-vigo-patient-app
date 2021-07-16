import * as React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {List, Divider, Title, Subheading, Text} from 'react-native-paper';

export default class AppListView extends React.Component {
  constructor(props) {
    super(props);
  }
  onListClick = selectedItem => {
    console.log('List View Pressed');
    this.props.onListClick(selectedItem);
  };
  createListBody = () => {
    let listBody = [];
    for (let index = 0; index < this.props?.dataSource?.rows?.length; index++) {
      listBody.push(
        <List.Item
          onPress={this.onListClick(this.props?.dataSource?.rows[index])}
          key={'listBody_' + index}
          left={() => <List.Icon icon="file-eye-outline" />}
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
      if (index === this.props?.dataSource?.rows?.length - 1) {
        listBody.push(<Divider key={'dividerBody_' + index} />);
      }
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
  },
  listSubTitleFont: {
    fontSize: 10,
  },
});
