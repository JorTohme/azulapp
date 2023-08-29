import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Colors from '../../utils/Colors';

export default function Order({data}) {
  const orderTime = new Date(data.created_at).toLocaleTimeString();
  const actualTime = new Date().toLocaleTimeString();

  // Saber el tiempo que paso desde que se pidio

  const timeZero = orderTime - actualTime;

  console.log(timeZero);
  return (
    <View style={s.order}>
      <View style={s.orderTopData}>
        <Text>#{data.table}</Text>
        {/* Hora en la que se pidio  */}
        <Text>{}</Text>
        <Text>{data.waiterName}</Text>
      </View>
      <View style={s.orderDetail}>
        {data.orderItems.map((item, index) => {
          return (
            <View style={s.detailContainer} key={item.order_id + index}>
              <Text style={s.amount}> {item.amount} </Text>
              <View style={s.detailNoteContainer}>
                <Text style={s.detail}> {item.menuItem.name} </Text>
                {item.note && <Text style={s.note}> {item.note} </Text>}
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  order: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    marginBottom: 20,
    height: 'auto',
  },
  orderTopData: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.pink,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 10,
  },
  orderDetail: {
    padding: 10,
    width: '100%',
    gap: 10,
  },
  amount: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  detailContainer: {
    marginLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  detail: {
    fontSize: 18,
  },
  note: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  detailNoteContainer: {
    marginLeft: 10,
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
  },
});
