import React, {useEffect, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Tables from '../../Views/Tables';
import Orders from '../../Views/Orders';
import Colors from '../../utils/Colors';
import TabNavigatorStyle from './TabNavigatorStyle';
import {useUpdateSpaces, useUpdateOrders} from '../../utils/Hooks';
import NetInfo from '@react-native-community/netinfo';
import io from 'socket.io-client';

const Tab = createBottomTabNavigator();
const socket = io('http://192.168.1.94:3000');

export default function TabNavigator({navigation}) {
  const [loading, setLoading] = useState(true);
  const [toastInfo, setToastInfo] = useState(null);

  const updateOrders = useUpdateOrders();
  const updateSpaces = useUpdateSpaces(setLoading);

  useEffect(() => {
    socket.connect();
    function onConnect() {
      console.log('connected');
    }

    socket.on('connect', onConnect);

    socket.on('updateOrders', (res) => {
      if (res.success) {
        updateOrders();
      }
    });

    socket.on('updateSpaces', (res) => {
      if (res.success) {
        updateSpaces();
      }
    });

    // on disconnect retry connection
    socket.on('disconnect', () => {
      console.log('disconnected');
      socket.connect();
    });

    // on error retry connection
    socket.on('connect_error', () => {
      console.log('error');
      socket.connect();
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setLoading(true);
    updateOrders();
    updateSpaces();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      console.log(state.isConnected);
      if (!state.isConnected) {
        navigation.navigate('Offline');
      }
    });
    return () => {
      unsubscribe();
    };
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
        children={() => <Tables loading={loading} navigation={navigation} />}
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
