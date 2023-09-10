import React from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Colors from '../../utils/Colors';
import Icons from '../../utils/Icons';
export default function Header({navigation}) {
  return (
    <View style={s.container}>
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
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  gearIcon: {
    width: 30,
    height: 30,
  },
});
