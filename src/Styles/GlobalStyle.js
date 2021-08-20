import {StyleSheet} from 'react-native';
import {ColorConstant} from '../Constants/ColorConstant';
export const GlobalStyle = StyleSheet.create({
  contactHeader: {
    backgroundColor: '#fff',
    width: '98%',
    alignItems: 'center',
    borderWidth: 0,
    borderBottomWidth: 0.6,
    borderColor: '#e8e8e8',
    marginBottom: 5,
  },
  fontItalic: {
    fontSize: 10,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    height: '100%',
    width: '96%',
    borderRadius: 5,
    marginBottom: '2%',
  },
  listIconColor: {
    color: ColorConstant.iconColor,
  },
  modalCloseButton: {
    padding: 0,
    left: '89%',
    backgroundColor: ColorConstant.iconBackgroundColor,
  },
  fontBold: {
    fontWeight: 'bold',
    fontSize: 10,
    color: ColorConstant.fontTitleColor,
  },
  fontBoldItalic: {
    fontWeight: 'bold',
    fontSize: 10,
    fontStyle: 'italic',
    textAlign: 'center',
    color: ColorConstant.fontTitleColor,
  },
  detailContainer: {flex: 1},
  detailRow: {
    flexDirection: 'row',
  },
  detailHeaderColLeftAlign: {
    borderColor: '#e8e8e8',
    borderWidth: 0,
    borderBottomWidth: 0.6,
    width: '25%',
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: 10,
    color: ColorConstant.fontTitleColor,
  },
  detailHeaderCol: {
    borderColor: '#e8e8e8',
    borderWidth: 0,
    borderBottomWidth: 0.6,
    width: '25%',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 10,
    color: ColorConstant.fontTitleColor,
  },
  detailColLeftAlign: {
    borderColor: '#e8e8e8',
    borderWidth: 0,
    borderBottomWidth: 0.6,
    width: '25%',
    textAlign: 'left',
    fontSize: 10,
  },
  detailCol: {
    borderColor: '#e8e8e8',
    borderWidth: 0,
    borderBottomWidth: 0.6,
    width: '25%',
    textAlign: 'center',
    fontSize: 10,
  },
});