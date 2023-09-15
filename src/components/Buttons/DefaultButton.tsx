import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import Colors from '../../utils/Colors';

interface Props {
  text: string;
  onPress: () => void;
  style?: any;
  textStyle?: any;
  disabled?: boolean;
}

export default function DefaultButton({
  text,
  onPress,
  style,
  textStyle,
  disabled,
}: Props) {
  return (
    <TouchableOpacity
      style={[s.button, style]}
      onPress={onPress}
      disabled={disabled}>
      <Text style={[s.buttonText, textStyle]}>{text}</Text>
    </TouchableOpacity>
  );
}

const s = StyleSheet.create({
  button: {
    backgroundColor: Colors.selected2,
    borderRadius: 8,
    padding: 10,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
  },
});
