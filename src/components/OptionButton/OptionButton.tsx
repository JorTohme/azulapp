import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import Colors from '../../utils/Colors';
import Icons from '../../utils/Icons';

type Props = {
  text: string;
  icon: any;
  onPress: () => any;
  chevronDisabled?: boolean;
};

export default function OptionButton({
  text,
  icon,
  onPress,
  chevronDisabled,
}: Props) {
  return (
    <TouchableOpacity
      style={s.optionButton}
      activeOpacity={0.6}
      onPress={onPress}>
      <View style={s.optionImageCircle}>
        <Image source={icon} style={s.optionImage} />
      </View>
      <Text style={s.optionButtonText}>{text}</Text>
      {!chevronDisabled && (
        <Image
          source={Icons.ChevronRight}
          style={[s.optionImage, s.optionChevron]}
        />
      )}
    </TouchableOpacity>
  );
}

const s = StyleSheet.create({
  optionButton: {
    paddingVertical: 7,
    paddingHorizontal: 15,
    borderRadius: 8,
    flexDirection: 'row',
    backgroundColor: Colors.gray6,
    gap: 20,
    alignItems: 'center',
  },
  optionChevron: {
    resizeMode: 'contain',
    tintColor: Colors.selected2,
    marginLeft: 'auto',
  },
  optionImageCircle: {
    width: 32,
    height: 32,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: Colors.selected2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionImage: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  optionButtonText: {
    fontSize: 16,
    margin: 0,
    padding: 0,
    textAlignVertical: 'center',
    color: Colors.selected2,
  },
});
