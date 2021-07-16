import React from 'react';
import {StyleSheet} from 'react-native';
import {BottomNavigation, Text} from 'react-native-paper';
import {AppGlobalConstants} from '../Constants/AppGlobalConstants';
import MedicalBillList from '../View/Records/MedicalBillList';
import Background from '../Reusables/Background';
import HeaderNav from '../Reusables/HeaderNav';
export default function Darshboard({navigation}) {
  const PrescriptionRoute = () => <Text>Prescription Route</Text>;
  const MedicalBillRoute = () => <MedicalBillList></MedicalBillList>;
  const LabReportRoute = () => <Text>LabReportRoute</Text>;
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: AppGlobalConstants.Routes.Prescription,
      title: 'Prescriptions',
      icon: 'layers-triple-outline',
    },
    {
      key: AppGlobalConstants.Routes.MedicalBill,
      title: 'Medical Bills',
      icon: 'layers-triple',
    },
    {
      key: AppGlobalConstants.Routes.LabBill,
      title: 'Lab Reports',
      icon: 'layers-off-outline',
    },
  ]);
  const renderScene = BottomNavigation.SceneMap({
    Prescription: PrescriptionRoute,
    MedicalBill: MedicalBillRoute,
    LabBill: LabReportRoute,
  });

  return (
    <Background>
      <HeaderNav visible="true"></HeaderNav>
      <BottomNavigation
        style={styles.bottom}
        navigationState={{index, routes}}
        onIndexChange={setIndex}
        renderScene={renderScene}
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
