import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Colors from '../../utils/Colors';

// Screens
import TabNavigator from './TabNavigator';
import Login from '../UserHandling/Login';
import OptionsMenu from '../../Views/OptionsMenu';
import Offline from '../../Views/Offline';
import Register from '../UserHandling/Register';
import LogoutScreen from '../../Views/Logout';
import DeleteAccount from '../../Views/DeleteAccount';

const Stack = createNativeStackNavigator();

const headerOptions = {
  headerShown: false,
  gestureEnabled: false,
};

export default function StackNavigator() {
  return (
    <Stack.Navigator screenOptions={headerOptions}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: Colors.selected,
          },
          headerTitle: 'Registro',
          headerTitleStyle: {
            color: Colors.white,
            fontWeight: 'bold',
            fontSize: 21,
          },
          headerTintColor: '#fff',
        }}
      />
      <Stack.Screen name="Main" component={TabNavigator} />
      <Stack.Screen
        name="Options"
        component={OptionsMenu}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: Colors.selected,
          },
          headerTitle: 'Opciones',
          headerTitleStyle: {
            color: Colors.white,
            fontWeight: 'bold',
            fontSize: 21,
          },
          headerTintColor: '#fff',
        }}
      />
      <Stack.Screen name="LogoutScreen" component={LogoutScreen} />
      <Stack.Screen name="DeleteAccount" component={DeleteAccount} />

      <Stack.Screen name="Offline" component={Offline} />
    </Stack.Navigator>
  );
}
