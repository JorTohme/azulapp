import React from 'react';
import {Text, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import Colors from '../../utils/Colors';

export default function SpaceSelector({data, setSelectedSpace, loading}) {
  return (
    <ScrollView
      horizontal
      style={s.spaceSelector}
      contentContainerStyle={s.selectContainer}>
      {!loading ? (
        data.map((item, index) => (
          <TouchableOpacity
            style={s.selector}
            key={index}
            onPress={() => setSelectedSpace(item.id)}>
            <Text style={s.text}>{item.name}</Text>
          </TouchableOpacity>
        ))
      ) : (
        <Text>Loading...</Text>
      )}
    </ScrollView>
  );
}

const s = StyleSheet.create({
  spaceSelector: {
    height: 50,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.gray,
  },
  selectContainer: {
    paddingHorizontal: 15,
    flexDirection: 'row',
    gap: 15,
    alignItems: 'center',
  },
  selector: {
    width: 90,
    paddingVertical: 5,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: Colors.selected2,
  },
  text: {
    color: Colors.white,
  },
});
