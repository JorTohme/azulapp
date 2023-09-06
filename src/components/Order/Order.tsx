import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import Colors from '../../utils/Colors';
import putOrderStatus from '../../utils/Connections/putOrderStatus';

export default function Order({data}) {
  const [time, setTime] = useState('');
  const [color, setColor] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date(data.created_at);
      const now = new Date();
      const diff = now.getTime() - date.getTime();
      const minutes = Math.floor(diff / 1000 / 60);
      const seconds = Math.floor(diff / 1000) % 60;

      if (minutes > 60) {
        const hours = Math.floor(minutes / 60);
        setTime(`${hours}h ${minutes % 60}m`);
        return;
      }
      setTime(`${minutes}m ${seconds}s`);
    }, 1000);

    return () => clearInterval(interval);
  }, [data.created_at]);

  useEffect(() => {
    const colors = {
      green: Colors.green,
      yellow: Colors.yellow,
      red: Colors.red,
    };
    setColor(colors[data.status]);
  }, [data.status]);

  function updateStatus(newStatus) {
    if (newStatus === data.status || newStatus === color) {
      return;
    }

    const colors = {
      green: Colors.green,
      yellow: Colors.yellow,
      red: Colors.red,
    };

    putOrderStatus(data.id, {status: newStatus})
      .then(() => {
        setColor(colors[newStatus]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <View style={s.order}>
      <View style={[s.orderTopContainer, {backgroundColor: color}]}>
        <View style={s.orderTopData}>
          <Text>#{data.table_id}</Text>
          <Text>{time}</Text>
          <View style={s.pressableContainer}>
            <Pressable
              style={[s.pressableColor, s.green]}
              onPress={() => updateStatus('green')}
            />
            <Pressable
              style={[s.pressableColor, s.yellow]}
              onPress={() => updateStatus('yellow')}
            />
            <Pressable
              style={[s.pressableColor, s.red]}
              onPress={() => updateStatus('red')}
            />
          </View>
        </View>
        {/* <Text>{data.waiter_name}</Text> */}
      </View>
      <View style={s.orderDetail}>
        {data.orderItems.map((item, index) => {
          return (
            <View style={s.detailContainer} key={item.order_id + index}>
              <Text style={s.amount}> {item.quantity} </Text>
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
  },
  orderTopContainer: {
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
  pressableContainer: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
  pressableColor: {
    width: 18,
    height: 18,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.gray6,
  },
  green: {
    backgroundColor: Colors.green,
  },
  yellow: {
    backgroundColor: Colors.yellow,
  },
  red: {
    backgroundColor: Colors.red,
  },
});
