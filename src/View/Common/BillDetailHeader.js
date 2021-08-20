import * as React from 'react';
import {Paragraph} from 'react-native-paper';
import {View} from 'react-native';
import {GlobalStyle} from '../../Styles/GlobalStyle';

const BillDetailHeader = props => (
  <View style={GlobalStyle.contactHeader}>
    <Paragraph style={GlobalStyle.fontBoldItalic}>{props?.name}</Paragraph>
    <Paragraph style={GlobalStyle.fontItalic}>{props?.date}</Paragraph>
    <Paragraph style={GlobalStyle.fontBoldItalic}>{props?.amount}</Paragraph>
    <Paragraph style={GlobalStyle.fontItalic}>#MBVP00{props?.id}</Paragraph>
  </View>
);

export default BillDetailHeader;
