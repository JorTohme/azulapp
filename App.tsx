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
          {/* Only Android: */}
          <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />
          <ToastProvider>
            <StackNavigator />
          </ToastProvider>
        </SafeAreaProvider>
      </NavigationContainer>
    </StoreProvider>
  );
}
