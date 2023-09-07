import React, {useEffect, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Tables from '../../Views/Tables';
import Orders from '../../Views/Orders';
import Colors from '../../utils/Colors';
import TabNavigatorStyle from './TabNavigatorStyle';
import {useUpdateSpaces, useUpdateOrders} from '../../utils/Hooks';
const Tab = createBottomTabNavigator();

export default function App() {
  const [loading, setLoading] = useState(true);

  const updateOrders = useUpdateOrders();
  const updateSpaces = useUpdateSpaces(setLoading);

  useEffect(() => {
    setLoading(true);
    updateOrders();
    updateSpaces();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        children={() => <Tables loading={loading} />}
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
