import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import DatePicker from 'react-native-datepicker';
import {ColorConstant} from '../Constants/ColorConstant';
export default class CustomDatePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {maxDate: new Date(), defaultDate: props?.defaultDate};
  }
  onDateChange = date => {
    this.setState(previousState => {
      return {
        defaultDate: date,
      };
    });
    this.props.onDateChange(this.state?.defaultDate);
    
    console.log(this.state?.defaultDate);
  };

  render() {
    return (
      <DatePicker
        style={styles.datePicker}
        date={this?.state?.defaultDate}
        mode="date"
        placeholder="select date"
        format="YYYY-MM-DD"
        maxDate={this.state?.maxDate}
        confirmBtnText="'Confirm'"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 10,
            marginLeft: 0,
            width: 20,
            height: 20,
          },
          dateInput: {
            marginLeft: 5,
            borderWidth: 0,
          },
        }}
        onDateChange={date => this.onDateChange(date)}
      />
    );
  }
}

const styles = StyleSheet.create({
  datePicker: {
    top: '5%',
    bottom: '5%',
    width: '50%',
    left: '30%',
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: ColorConstant.backgroundColor,
  },
});
