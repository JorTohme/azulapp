import React, {useEffect, useState} from 'react';
import {StyleSheet, ScrollView, SafeAreaView} from 'react-native';
import Order from '../components/Order/Order';
import getTodayOrders from '../utils/Connections/getTodayOrders';

export default function Orders() {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getTodayOrders()
      .then((response) => {
        setOrders(response);
      })
      .then(() => setLoading(false));
  }, []);

  if (loading) {
    return <></>;
  }

  return (
    <SafeAreaView style={s.container}>
      <ScrollView
        style={s.orderContainer}
        contentContainerStyle={s.containerPadding}>
        {orders.map((order) => (
          <Order key={order.id} data={order} />
        ))}
      </ScrollView>
    </SafeAreaView>
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
