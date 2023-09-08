import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useFreeTable} from '../../utils/Hooks';

export default function TablePay({tableData}) {
  const freeTable = useFreeTable();
  return (
    <View>
      <Text style={s.title}>¿Ya pagaron?</Text>
      <TouchableOpacity
        style={s.buttonOpen}
        activeOpacity={0.8}
        onPress={() => {
          freeTable(tableData.id);
        }}>
        <Text style={s.buttonOpenText}>Abrir Mesa</Text>
      </TouchableOpacity>
    </View>
  );
}

const s = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
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
