import React, {useContext, useEffect, useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  RefreshControl,
  View,
  SafeAreaView,
  Image,
  Text,
} from 'react-native';
import Order from '../components/Order/Order';
import {StoreContext} from '../store/StoreProvider';
import {useUpdateOrders} from '../utils/Hooks';
import Colors from '../utils/Colors';
import Header from '../components/Header/Header';
import Images from '../utils/Images';

export default function Orders({navigation}) {
  const [orders, setOrders] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const [store] = useContext(StoreContext);
  const [random, setRandom] = useState(null);

  const updateOrders = useUpdateOrders();

  const onRefresh = () => {
    setRefreshing(true);
    updateOrders();
    setRefreshing(false);
  };

  useEffect(() => {
    setOrders(store.orders);
    setRandom(Math.floor(Math.random() * 3));
  }, [store.orders]);

  return (
    <SafeAreaView
      style={{
        backgroundColor: Colors.selected2,
      }}>
      <View style={{backgroundColor: Colors.gray6}}>
        <Header title="Comandas" navigation={navigation} />
        <ScrollView
          style={s.orderContainer}
          contentContainerStyle={s.containerPadding}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          {orders.length > 0 ? (
            orders.map((order) => <Order key={order.id} data={order} />)
          ) : (
            <View style={s.imageContainer}>
              <Image source={Images.OrderEmpty[random]} style={s.image} />
              <Text style={s.text}>Parece que no hay pedidos</Text>
            </View>
          )}
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
  imageContainer: {
    paddingTop: 160,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 300,
  },
  text: {
    fontSize: 18,
    color: Colors.selected2,
  },
});
