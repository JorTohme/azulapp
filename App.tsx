import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {SafeAreaView} from 'react-native-safe-area-context';
import Colors from './src/utils/Colors';
import {StatusBar} from 'react-native';
// Views
import Tables from './src/Views/Tables';
import Orders from './src/Views/Orders';

// Navigators
import TabNavigator from './src/components/TabNavigator/TabNavigator';

// const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <SafeAreaView style={{flex: 1, backgroundColor: Colors.blue}}>
          <StatusBar barStyle="dark-content" backgroundColor={Colors.blue} />
          <Tab.Navigator
            tabBar={(props) => <TabNavigator {...props} />}
            screenOptions={{
              tabBarStyle: {
                backgroundColor: Colors.blue,
                borderTopWidth: 0,
              },
              tabBarActiveTintColor: Colors.white,
              tabBarInactiveTintColor: Colors.white,
              headerShown: false,
            }}>
            <Tab.Screen
              name="Tables"
              component={Tables}
              options={{
                headerShown: false,
              }}
            />
            <Tab.Screen
              name="Orders"
              component={Orders}
              options={{
                headerShown: false,
              }}
            />
          </Tab.Navigator>
        </SafeAreaView>
      </SafeAreaProvider>
    </NavigationContainer>
  );
}
