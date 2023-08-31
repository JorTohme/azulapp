import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import MenuItemsModal from '../MenuItemsModal/MenuItemsModal';
export default function TableBusy({tableData}) {
  const [menuModal, setMenuModal] = useState(false);

  return (
    <>
      <View style={s.viewContainer}>
        <Text style={s.title}>Mesa {tableData.id} </Text>
        <TouchableOpacity
          style={s.buttonOpen}
          activeOpacity={0.8}
          onPress={() => {
            setMenuModal(true);
          }}>
          <Text style={s.buttonOpenText}>Añadir comanda</Text>
        </TouchableOpacity>
      </View>
      <MenuItemsModal visible={menuModal} setVisible={setMenuModal} />
    </>
  );
}

const s = StyleSheet.create({
  viewContainer: {
    // backgroundColor: Colors.pink,
    justifyContent: 'space-between',
    height: '90%',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  buttonOpen: {
    backgroundColor: '#f77839',
    borderRadius: 8,
    padding: 10,
    elevation: 2,
    marginTop: 20,
  },
  buttonOpenText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
  },
});
