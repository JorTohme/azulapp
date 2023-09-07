import React, {useContext, useEffect, useState} from 'react';
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

  const [store, dispatch] = useContext(StoreContext);

  const [specialButtonAction, setSpecialButtonAction] = useState(() => {
    return () => {
      console.log('default special button action');
    };
  });

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
  }, [dispatch]);

  return (
    <Tab.Navigator
      tabBar={(props) => (
        <TabNavigatorStyle
          {...props}
          specialButtonAction={specialButtonAction}
        />
      )}
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
            setSpecialButtonAction={setSpecialButtonAction}
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
