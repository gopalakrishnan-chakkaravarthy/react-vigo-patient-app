import * as React from 'react';
import {Paragraph} from 'react-native-paper';
import {View} from 'react-native';
import {GlobalStyle} from '../../Styles/GlobalStyle';

const PrescDetailHeader = props => (
  <View style={GlobalStyle.contactHeader}>
    <Paragraph style={GlobalStyle.fontBoldItalic}>{props?.name}</Paragraph>
    <Paragraph style={GlobalStyle.fontItalic}>{props?.date}</Paragraph>
    <Paragraph style={GlobalStyle.fontBoldItalic}>{props?.diagnosis}</Paragraph>
    <Paragraph style={GlobalStyle.fontItalic}>#PTVP00{props?.id}</Paragraph>
  </View>
);

export default PrescDetailHeader;
