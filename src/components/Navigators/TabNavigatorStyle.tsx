import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  Image,
  Platform,
  TouchableOpacity,
} from 'react-native';
import Icons from '../../utils/Icons';
import Colors from '../../utils/Colors';

const viewName = ['Mesas', 'Comandas'];
const viewIcon = [Icons.TabTable, Icons.TabFood];
const viewIconActive = [Icons.TabTableActive, Icons.TabFoodActive];

const isIOS = Platform.OS === 'ios';

export default function TabNavigator({
  state,
  descriptors,
  navigation,
  specialButtonAction,
}) {
  return (
    <View style={s.background}>
      <View style={s.container}>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
          const label = viewName[index];

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <Pressable
              key={index}
              accessibilityRole="button"
              accessibilityState={isFocused ? {selected: true} : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={s.button}>
              <Image
                source={isFocused ? viewIconActive[index] : viewIcon[index]}
                style={s.icons}
              />
              <Text style={{color: isFocused ? Colors.selected : '#787878'}}>
                {label}
              </Text>
            </Pressable>
          );
        })}
      </View>
      <TouchableOpacity
        style={s.addButton}
        onPress={() => {
          specialButtonAction();
        }}>
        <Image source={Icons.TabPlus} style={s.plusIcon} />
      </TouchableOpacity>
    </View>
  );
}

const s = StyleSheet.create({
  background: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 80,
    position: 'absolute',
    bottom: 0,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.white,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: isIOS ? 50 : 20,
    width: '90%',
    borderRadius: 14,
    height: 65,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,

    elevation: 14,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
  },
  icons: {
    width: 35,
    height: 35,
    marginBottom: -5,
  },
  addButton: {
    position: 'absolute',
    bottom: isIOS ? 15 : 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.selected,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: isIOS ? 50 : 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 11,
  },
  plusIcon: {
    width: 35,
    height: 35,
  },
});
