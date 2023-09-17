import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Logout} from '../utils/Helper';
import Colors from '../utils/Colors';
export default function LogoutScreen({navigation}) {
  return (
    <View style={s.container}>
      <View style={s.fixedCenter}>
        <Text style={s.title}>¿Seguro de que querés cerrar sesión?</Text>
        <View style={s.buttonContainer}>
          <TouchableOpacity
            style={s.accept}
            onPress={() => {
              Logout(navigation);
            }}>
            <Text style={s.acceptText}>Si</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={s.cancel}
            onPress={() => {
              navigation.navigate('Options');
            }}>
            <Text>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gray6,
    justifyContent: 'center',
    paddingTop: 60,
  },
  fixedCenter: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: 50,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '80%',
  },
  title: {
    width: '50%',
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 20,
  },
  accept: {
    backgroundColor: Colors.selected2,
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.selected2,
    borderRadius: 10,
    paddingHorizontal: 30,
    marginRight: 10,
  },
  acceptText: {
    color: Colors.white,
  },
  cancel: {
    backgroundColor: Colors.white,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: Colors.selected2,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
});
