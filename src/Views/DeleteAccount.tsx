import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {Logout} from '../utils/Helper';
import Colors from '../utils/Colors';
import deleteAccount from '../utils/Connections/deleteAccount';
export default function DeleteAccount({navigation}) {
  const showAlert = () => {
    Alert.alert(
      '¿Seguro?',
      'Al dar de baja tu cuenta, se eliminarán todos tus datos y no podrás recuperarlos. Esta acción no se puede deshacer.',
      [
        {
          text: 'Cancelar',
          onPress: () => {
            navigation.navigate('Options');
          },
          style: 'cancel',
        },
        {
          text: 'Dar de baja',
          onPress: () => {
            deleteAccount().then((res) => {
              if (res.success) {
                Logout(navigation);
              }
            });
          },
        },
      ],
      {cancelable: true},
    );
  };
  return (
    <View style={s.container}>
      <View style={s.fixedCenter}>
        <Text style={s.title}>
          ¿Estás seguro de que querés dar de baja tu cuenta?
        </Text>
        <Text style={s.subtitle}>
          Al dar de baja tu cuenta, se eliminarán todos tus datos y no podrás
          recuperarlos. Esta acción no se puede deshacer.
        </Text>
        <View style={s.buttonContainer}>
          <TouchableOpacity
            style={s.accept}
            onPress={() => {
              showAlert();
            }}>
            <Text>Si</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={s.cancel}
            onPress={() => {
              navigation.navigate('Options');
            }}>
            <Text style={s.cancelText}>Cancelar</Text>
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
    width: '90%',
    gap: 10,
  },
  title: {
    width: '80%',
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    width: '80%',
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 20,
  },
  cancel: {
    backgroundColor: Colors.selected2,
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.selected2,
    borderRadius: 10,
    paddingHorizontal: 40,
    marginRight: 10,
  },
  cancelText: {
    color: Colors.white,
  },
  accept: {
    backgroundColor: Colors.white,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: Colors.selected2,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
});
