import { View, Text, StyleSheet, ScrollView } from "react-native";
import Colors from "../utils/Colors";
import Order from "../components/Order/Order";

import { MockOrders } from "../utils/MockOrders";

export default function Orders () {
  return (
    <View style={s.container}>
      <Text>Comandas</Text>
      <ScrollView style={s.orderContainer}>
        {
          MockOrders.map((order, index) => (
            <Order key={index} data={order} />
          ))
        }
      </ScrollView>
    </View>
  )
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background2,
    paddingTop: 20,
  },
  orderContainer: {
    height: '100%',
    backgroundColor: Colors.red,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
})