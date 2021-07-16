import React from 'react';
import {Provider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {defaultTheme} from './src/Core/theme';
import LoginScreen from './src/View/LoginScreen';
import Dashboard from './src/View/Dashboard';
const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider theme={defaultTheme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="LoginScreen"
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
