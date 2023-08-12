import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Main from './src/main'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SafeAreaView } from 'react-native-safe-area-context';

import Colors from './src/utils/Colors';

const Stack = createNativeStackNavigator();

export default function App () {
  return (
    
    <NavigationContainer>
      <SafeAreaProvider>
        <SafeAreaView style={{flex: 1, backgroundColor: Colors.blue}}>
          <Stack.Navigator>
            <Stack.Screen name="Main" component={Main} 
            options={{
              headerShown: false,
            }}
            />
          </Stack.Navigator>
        </SafeAreaView>
      </SafeAreaProvider>
    </NavigationContainer>
  )
}