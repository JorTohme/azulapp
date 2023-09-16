import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import Colors from '../../utils/Colors';

export default function GeneralLoader({loading}: {loading: boolean}) {
  if (loading) {
    return (
      <View style={s.container}>
        <ActivityIndicator size="large" color={Colors.blue} />
      </View>
    );
  }
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
});
