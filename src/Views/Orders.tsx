import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import Colors from '../utils/Colors';
import Order from '../components/Order/Order';

import {MockOrders} from '../utils/MockOrders';

export default function Orders() {
  return (
    <View style={s.container}>
      <ScrollView style={s.orderContainer}>
        {MockOrders.map((order, index) => (
          <Order key={index} data={order} />
        ))}
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingTop: 20,
  },
  orderContainer: {
    height: '100%',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});
