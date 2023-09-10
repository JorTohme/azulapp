import React from 'react';
import {View, StyleSheet, Image, TouchableOpacity, Text} from 'react-native';
import Colors from '../../utils/Colors';
import Icons from '../../utils/Icons';
export default function Header({navigation, title}) {
  return (
    <View style={s.container}>
      <Text style={s.title}>{title}</Text>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => {
          navigation.navigate('Options');
        }}>
        <Image source={Icons.GearWhite} style={s.gearIcon} />
      </TouchableOpacity>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    backgroundColor: Colors.selected,
    paddingVertical: 10,
    paddingHorizontal: 15,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  gearIcon: {
    width: 30,
    height: 30,
  },
  title: {
    fontSize: 21,
    color: Colors.white,
    fontWeight: 'bold',
  },
});
