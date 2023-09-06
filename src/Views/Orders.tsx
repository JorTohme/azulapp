import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, ScrollView, RefreshControl, View} from 'react-native';
import Order from '../components/Order/Order';
import {StoreContext} from '../store/StoreProvider';
import getTodayOrders from '../utils/Connections/getTodayOrders';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const [store, dispatch] = useContext(StoreContext);

  const updateOrders = () => {
    getTodayOrders()
      .then((res) => {
        dispatch({type: 'SET_ORDERS', payload: res});
      })
      .then(() => {
        setRefreshing(false);
      });
  };

  const onRefresh = () => {
    setRefreshing(true);
    updateOrders();
  };

  useEffect(() => {
    setOrders(store.orders);
  }, [store.orders]);

  return (
    <View style={{paddingTop: 50}}>
      <ScrollView
        style={s.orderContainer}
        contentContainerStyle={s.containerPadding}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {orders.map((order) => (
          <Order key={order.id} data={order} />
        ))}
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  orderContainer: {
    height: '100%',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  containerPadding: {
    paddingBottom: 100,
  },
});
