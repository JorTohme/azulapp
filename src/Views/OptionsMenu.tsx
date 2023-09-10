import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Colors from '../utils/Colors';

export default function OptionsMenu() {
  return (
    <ScrollView style={s.container}>
      <View style={s.optionButtonContainer}>
        <TouchableOpacity style={s.optionButton} activeOpacity={0.6}>
          <Text>Perfil</Text>
        </TouchableOpacity>
        <TouchableOpacity style={s.optionButton} activeOpacity={0.6}>
          <Text>Perfil</Text>
        </TouchableOpacity>
        <TouchableOpacity style={s.optionButton} activeOpacity={0.6}>
          <Text>Perfil</Text>
        </TouchableOpacity>
        <TouchableOpacity style={s.optionButton} activeOpacity={0.6}>
          <Text>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  safeAreaView: {
    backgroundColor: Colors.selected2,
  },
  container: {
    backgroundColor: Colors.white,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  optionButtonContainer: {
    gap: 10,
  },
  optionButton: {
    height: 40,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',

    backgroundColor: Colors.gray6,
  },
});
