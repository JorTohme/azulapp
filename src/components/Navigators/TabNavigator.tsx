import React, {useEffect, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Tables from '../../Views/Tables';
import Orders from '../../Views/Orders';
import Colors from '../../utils/Colors';
import TabNavigatorStyle from './TabNavigatorStyle';
import getSpaces from '../../utils/Connections/getSpaces';
const Tab = createBottomTabNavigator();

export default function App() {
  const [loading, setLoading] = useState(true);
  const [spaces, setSpaces] = useState([]);

  const updateSpaces = () => {
    // setLoading(true);
    getSpaces()
      .then((res) => setSpaces(res))
      .then(() => setLoading(false));
  };

  useEffect(() => {
    updateSpaces();
  }, []);

  console.log(spaces);
  return (
    <Tab.Navigator
      tabBar={(props) => <TabNavigatorStyle {...props} />}
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
        children={() => (
          <Tables
            loading={loading}
            spaces={spaces}
            updateSpaces={updateSpaces}
          />
        )}
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
  );
}
