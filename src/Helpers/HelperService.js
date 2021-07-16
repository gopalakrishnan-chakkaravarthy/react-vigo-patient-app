class HelperService {
  filterItems = (dataRows, filterKey, filterValue) => {
    filterValue = filterValue.toLowerCase();
    let filteredItems = dataRows?.filter(item => {
      return item[filterKey].toLowerCase().match(filterValue);
    });
    if (!filterValue || filterValue === '') {
      return dataRows;
    } else if (!Array.isArray(filteredItems) && !filteredItems.length) {
      return [];
    } else if (Array.isArray(filteredItems)) {
      return filteredItems;
    }
  };
}
export default new HelperService();
