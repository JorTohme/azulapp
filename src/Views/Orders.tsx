import React from 'react';
import {StyleSheet, ScrollView, SafeAreaView} from 'react-native';
import Order from '../components/Order/Order';

import {MockOrders} from '../utils/MockOrders';

export default function Orders() {
  return (
    <SafeAreaView style={s.container}>
      <ScrollView style={s.orderContainer}>
        {MockOrders.map((order, index) => (
          <Order key={index} data={order} />
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
});
