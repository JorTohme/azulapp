import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Colors from '../../utils/Colors';

export default function Order({data}) {
  return (
    <View style={s.order}>
      <View style={s.orderTopData}>
        <Text># {data.tableId}</Text>
        {/* Tiempo desde que se pidio el pedido */}
        <Text>{data.time}</Text>
        <Text>{data.waiter}</Text>
      </View>
      <View style={s.orderDetail}>
        {data.items.map((item, index) => {
          return (
            <View style={s.detailContainer} key={index}>
              <Text style={s.amount}> {item.amount} </Text>
              <View style={s.detailNoteContainer}>
                <Text style={s.detail}> {item.name} </Text>
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
