import { StyleSheet, Text, Dimensions, TouchableOpacity } from "react-native";
import Colors from "../../utils/Colors";

import OrderModal from "../OrderModal/OrderModal";
import { useState } from "react";

export default function Table(props) {

  const [modalVisible, setModalVisible] = useState(false);

  const { width } = Dimensions.get('window');

  let state;

  if (props.state == 'free') {
    state = {backgroundColor: Colors.green}
  } else if (props.state == 'preparing') {
    state = {backgroundColor: Colors.black}
  } else if (props.state == 'served') {
    state = {backgroundColor: Colors.red}
  } else {
    state = {backgroundColor: Colors.gray}
  }

  let shape;

  if (props.shape == 'square') {
    shape = s.shapeSquare
  } else if (props.shape == 'round') {
    shape = s.shapeRound
  } else {
    shape = s.shapeSquare
  }

  if (props.map) {
    return (
      <>
        <TouchableOpacity 
        style={[s.container, shape, state, {width: width / 5, height: width / 5 }]}
        onPress={() => setModalVisible(true)}
        >
          <Text style={s.number}>{props.id}</Text>
        </TouchableOpacity>
        <OrderModal visible={modalVisible} setVisible={setModalVisible}/>
      </>
    )
  } else {
    return (
      <>
        <TouchableOpacity 
        style={[s.container, shape, state, {width: '100%', height: 50}, props.style]}
        onPress={() => props.onClick()}
        >
          <Text style={s.numberList}>{props.id}</Text>
        </TouchableOpacity>
      </>
    )
  }
}

const s = StyleSheet.create({
  container: {
    backgroundColor: Colors.green,
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 5,
    elevation: 6,
  },
  shapeSquare: {
    borderRadius: 10,
  },
  shapeRound: {
    borderRadius: 40,
  },
  number: {
    fontSize: 30,
    fontWeight: 'bold',
    color: Colors.white,
    textAlign: 'center',
  },
  numberList: {
    fontSize: 25,
    fontWeight: 'bold',
    color: Colors.white,
    textAlign: 'center',
  }
})