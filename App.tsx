import 'react-native-gesture-handler';
import {registerRootComponent} from 'expo';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Colors from './src/utils/Colors';
import {StatusBar} from 'react-native';
import {ToastProvider} from 'react-native-toast-notifications';

import StackNavigator from './src/components/Navigators/StackNavigator';

import StoreProvider from './src/store/StoreProvider';

export default function App() {
  return (
    <StoreProvider>
      <NavigationContainer>
        <SafeAreaProvider>
          <StatusBar
            barStyle="light-content"
            backgroundColor={Colors.selected2}
          />
          <ToastProvider>
            <StackNavigator />
          </ToastProvider>
        </SafeAreaProvider>
      </NavigationContainer>
    </StoreProvider>
  );
}

registerRootComponent(App);
