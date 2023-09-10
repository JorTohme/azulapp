import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import Login from '../UserHandling/Login';
import OptionsMenu from '../../Views/OptionsMenu';
import Colors from '../../utils/Colors';

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Main" component={TabNavigator} />
      <Stack.Screen
        name="Options"
        component={OptionsMenu}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: Colors.selected,
          },
          headerTitle: '',
          headerTintColor: '#fff',
        }}
      />
    </Stack.Navigator>
  );
}
