import React from 'react';
import {Provider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {AppGlobalConstants} from './src/Constants/AppGlobalConstants';
import {customTheme} from './src/Core/theme';
import HeaderNav from './src/Reusables/HeaderNav';
import LoginScreen from './src/View/LoginScreen';
import PatientQr from './src/View/Account/PatientQr';
import Dashboard from './src/View/Dashboard';
const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider theme={customTheme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={AppGlobalConstants.Routes.LoginScreen}
          screenOptions={{
            header: props => <HeaderNav {...props} />,
          }}>
          <Stack.Screen
            name={AppGlobalConstants.Routes.LoginScreen}
            component={LoginScreen}
          />
          <Stack.Screen
            name={AppGlobalConstants.Routes.Dashboard}
            component={Dashboard}
          />
          <Stack.Screen
            name={AppGlobalConstants.Routes.PatientQr}
            component={PatientQr}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
