import { format } from "date-fns";
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
  formatToEstDate(date){
    var formattedDate = format(date, "MM/dd/yyyy");
    return formattedDate;
  }
}
export default new HelperService();
