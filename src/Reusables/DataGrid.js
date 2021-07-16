import React from 'react';
import {ScrollView} from 'react-native';
import {Text, DataTable} from 'react-native-paper';
export default class DataGrid extends React.Component {
  constructor(props) {
    super(props);
    this.optionsPerPage = [2, 3, 4];
    this.state = {page: 0, itemsPerPage: this.optionsPerPage[0]};
  }
  setPage = page => {
    this.setState({
      page: page,
    });
  };
  setItemsPerPage = () => {
    this.setState({
      itemsPerPage: this.optionsPerPage[0],
    });
  };
  createHeader = () => {
    debugger;
    let tableHeader = [];
    // Outer loop to create parent
    for (
      let index = 0;
      index < this.props.dataSource.columnHeaders.length;
      index++
    ) {
      tableHeader.push(
        <DataTable.Title key={'headerCell_' + index}>
          {this.props.dataSource.columnHeaders[index].title}
        </DataTable.Title>,
      );
    }
    return tableHeader;
  };
  createRows = () => {
    let tableRows = [];
    debugger;
    // Outer loop to create parent
    for (let index = 0; index < this.props.dataSource.rows.length; index++) {
      let children = [];
      //Inner loop to create children
      for (
        let columnIndex = 0;
        columnIndex < this.props.dataSource.columnHeaders.length;
        columnIndex++
      ) {
        const columnName =
          '' + this.props.dataSource.columnHeaders[columnIndex].field + '';
        children.push(
          <DataTable.Cell key={'rowCell_' + columnName}>
            {this.props.dataSource.rows[index][columnName]}
          </DataTable.Cell>,
        );
      }
      //Create the parent and add the children
      tableRows.push(
        <DataTable.Row key={'row_' + index}>{children}</DataTable.Row>,
      );
    }
    return tableRows;
  };

  render() {
    debugger;
    if (
      this.props?.dataSource?.columnHeaders?.length > 0 &&
      this.props?.dataSource?.rows?.length > 0
    ) {
      debugger;
      return (
        <ScrollView>
          <DataTable>
            <DataTable.Header>{this.createHeader()}</DataTable.Header>
            {this.createRows()}
            <DataTable.Pagination
              page={this.state.page}
              numberOfPages={3}
              onPageChange={page => this.setPage(page)}
              label="1-2 of 6"
              optionsPerPage={this.state.optionsPerPage}
              itemsPerPage={this.state.itemsPerPage}
              setItemsPerPage={this.setItemsPerPage}
              showFastPagination
              optionsLabel={'Rows per page'}
            />
          </DataTable>
        </ScrollView>
      );
    }
    return <Text>No Records Found</Text>;
  }
}
