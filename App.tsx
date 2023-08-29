import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Colors from './src/utils/Colors';
import {StatusBar} from 'react-native';

import StackNavigator from './src/components/Navigators/StackNavigator';

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        {/* Only Android: */}
        <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />
        <StackNavigator />
      </SafeAreaProvider>
    </NavigationContainer>
  );
}
