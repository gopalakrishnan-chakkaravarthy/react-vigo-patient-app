import React from 'react';
import {StyleSheet} from 'react-native';
import {BottomNavigation} from 'react-native-paper';
import {AppGlobalConstants} from '../Constants/AppGlobalConstants';
import {ColorConstant} from '../Constants/ColorConstant';
import MedicalBillList from '../View/Records/MedicalBillList';
import PrecriptionList from '../View/Records/PrescriptionList';
import LabBillList from '../View/Records/LabBillList';
import Background from '../Reusables/Background';
export default function Darshboard() {
  const PrescriptionRoute = () => <PrecriptionList></PrecriptionList>;
  const MedicalBillRoute = () => <MedicalBillList></MedicalBillList>;
  const LabBill = () => <LabBillList></LabBillList>;
  const [index, setIndex] = React.useState(1);
  const [routes] = React.useState([
    {
      key: AppGlobalConstants.Routes.Prescription,
      title: 'Prescriptions',
      icon: 'layers-triple-outline',
      color: ColorConstant?.iconColor,
    },
    {
      key: AppGlobalConstants.Routes.MedicalBill,
      title: 'Medical Bills',
      icon: 'layers-triple',
      color: ColorConstant?.iconColor,
    },
    {
      key: AppGlobalConstants.Routes.LabBill,
      title: 'Lab Bill',
      icon: 'blur-linear',
      color: ColorConstant?.iconColor,
    },
  ]);
  const onTabPress = props => {};
  const renderScene = BottomNavigation.SceneMap({
    Prescription: PrescriptionRoute,
    MedicalBill: MedicalBillRoute,
    LabBill: LabBill,
  });

  return (
    <Background>
      <BottomNavigation
        style={styles.bottom}
        barStyle={{backgroundColor: ColorConstant.backgroundColor}}
        navigationState={{index, routes}}
        onIndexChange={setIndex}
        renderScene={renderScene}
        onTabPress={onTabPress}
      />
    </Background>
  );
}

const styles = StyleSheet.create({
  bottom: {
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
  },
});
