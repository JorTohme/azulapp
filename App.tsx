import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from './src/utils/Colors';
import { StatusBar } from 'react-native';
// Views
import Tables from './src/Views/Tables'
import Orders from './src/Views/Orders';

// Navigators


// const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App () {
  return (
    
    <NavigationContainer>
      <SafeAreaProvider>
        <SafeAreaView style={{flex: 1, backgroundColor: Colors.blue}}>
          <StatusBar barStyle="dark-content" backgroundColor={Colors.blue} />
          <Tab.Navigator
            screenOptions={{
              tabBarStyle: {
                backgroundColor: Colors.blue,
                borderTopWidth: 0,
              },
              tabBarActiveTintColor: Colors.white,
              tabBarInactiveTintColor: Colors.white,
              headerShown: false,
            }}
          >
            <Tab.Screen name="Tables" component={Tables} 
            options={{
              headerShown: false,
            }}
            />
            <Tab.Screen name="Orders" component={Orders} 
            options={{
              headerShown: false,
            }}
            />
          </Tab.Navigator>
        </SafeAreaView>
      </SafeAreaProvider>
    </NavigationContainer>
  )
}