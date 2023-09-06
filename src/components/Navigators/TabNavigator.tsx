import React, {useContext, useEffect, useReducer, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Tables from '../../Views/Tables';
import Orders from '../../Views/Orders';
import Colors from '../../utils/Colors';
import TabNavigatorStyle from './TabNavigatorStyle';
import getSpaces from '../../utils/Connections/getSpaces';
import getTodayOrders from '../../utils/Connections/getTodayOrders';
import {StoreContext} from '../../store/StoreProvider';
const Tab = createBottomTabNavigator();

export default function App() {
  const [loading, setLoading] = useState(true);
  const [spaces, setSpaces] = useState([]);
  // get orders y guardarlas en el store para usarlas en el componente de orders

  const [store, dispatch] = useContext(StoreContext);

  const updateSpaces = () => {
    getSpaces().then((res) => setSpaces(res));
  };

  useEffect(() => {
    getSpaces().then((res) => {
      setSpaces(res);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    getTodayOrders().then((res) => {
      dispatch({type: 'SET_ORDERS', payload: res});
    });
  }, [
    dispatch,
    // updateOrders,
  ]);

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
