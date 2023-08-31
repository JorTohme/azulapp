import React from 'react';
import {StyleSheet, Text, Dimensions, TouchableOpacity} from 'react-native';
import Colors from '../../utils/Colors';
import OrderModal from '../OrderModal/OrderModal';
import {useState} from 'react';

interface Props {
  data: any;
  styles?: any;
  onClick?: any;
  shape: string;
  map?: boolean;
  update?: any;
}

export default function Table({
  data,
  styles,
  onClick,
  shape,
  map,
  update,
}: Props) {
  const [modalVisible, setModalVisible] = useState(false);

  const {width} = Dimensions.get('window');

  let state;

  if (data.state === 'free') {
    state = {backgroundColor: Colors.green};
  } else if (data.state === 'preparing') {
    state = {backgroundColor: Colors.black};
  } else if (data.state === 'busy') {
    state = {backgroundColor: Colors.red};
  } else {
    state = {backgroundColor: Colors.gray};
  }

  let shapeStyle;

  if (shape === 'square') {
    shapeStyle = s.shapeSquare;
  } else if (shape === 'round') {
    shapeStyle = s.shapeRound;
  } else {
    shapeStyle = s.shapeSquare;
  }

  if (map) {
    return (
      <>
        <TouchableOpacity
          style={[
            s.container,
            shapeStyle,
            state,
            {width: width / 5, height: width / 5},
          ]}
          onPress={() => setModalVisible(true)}>
          <Text style={s.number}>{data.id}</Text>
        </TouchableOpacity>
        <OrderModal
          visible={modalVisible}
          setVisible={setModalVisible}
          tableData={data}
          update={update}
        />
      </>
    );
  } else {
    return (
      <>
        <TouchableOpacity
          style={[
            s.container,
            shapeStyle,
            state,
            {width: '100%', height: 50},
            styles,
          ]}
          onPress={() => onClick()}>
          <Text style={s.numberList}>{data.id}</Text>
        </TouchableOpacity>
      </>
    );
  }
}

const s = StyleSheet.create({
  container: {
    backgroundColor: Colors.green,
    justifyContent: 'center',
    shadowColor: '#000',
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
  },
});
