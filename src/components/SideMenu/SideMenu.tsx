import React, { useState, useEffect } from 'react';
import { View, Text, Animated, StyleSheet, TouchableHighlight } from 'react-native';

export default function SideMenu({ visible }) {
  const [slideAnim] = useState(new Animated.Value(visible ? 1 : 0)); // Initialize with proper value

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: visible ? 1 : 0,
      duration: 500, // Use the same duration for both opening and closing
      useNativeDriver: false,
    }).start();
  }, [visible]);

  return (
    <>
      <View style={[s.background, {display: visible ? 'flex' : 'none'}]} />
      <Animated.View
        style={[
          s.container,
          {
            transform: [
              {
                translateX: slideAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-500, 0],
                }),
              },
            ],
          },
        ]}
      >
        <View style={s.content}>
          <Text style={s.title}>Vistas</Text>
          <TouchableHighlight onPress={() => {
          }}>
            <Text>Mesas</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={() => {
          }}>
            <Text>Comandas</Text>
          </TouchableHighlight>
        </View>
      </Animated.View>
    </>
  );
}

const s = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    position: 'absolute',
    zIndex: 100,
    top: 60, // Same height as Header
  },
  container: {
    width: '80%',
    height: '100%',
    backgroundColor: 'white',
    position: 'absolute',
    zIndex: 100,
    top: 60, // Same height as Header
    left: 0,
  },
  content: {
    flex: 1,
    padding: 20,

  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
});
