import React, {useContext, useEffect, useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  RefreshControl,
  View,
  SafeAreaView,
} from 'react-native';
import Order from '../components/Order/Order';
import {StoreContext} from '../store/StoreProvider';
import {useUpdateOrders} from '../utils/Hooks';
import Colors from '../utils/Colors';
import Header from '../components/Header/Header';

export default function Orders({navigation}) {
  const [orders, setOrders] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const [store] = useContext(StoreContext);

  const updateOrders = useUpdateOrders();

  const onRefresh = () => {
    setRefreshing(true);
    updateOrders();
    setRefreshing(false);
  };

  useEffect(() => {
    setOrders(store.orders);
  }, [store.orders]);

  return (
    <SafeAreaView
      style={{
        backgroundColor: Colors.selected2,
      }}>
      <View style={{backgroundColor: Colors.gray6}}>
        <Header navigation={navigation} />
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
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: {
    paddingTop: 20,
  },
  orderContainer: {
    height: '100%',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  containerPadding: {
    paddingBottom: 220,
  },
});
