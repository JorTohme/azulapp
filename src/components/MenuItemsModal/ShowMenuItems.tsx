import React, {useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import Colors from '../../utils/Colors';
import Toast from 'react-native-toast-notifications';

export default function ShowMenuItems({
  menu,
  menuCategories,
  selectedClassification,
  setSelectedClassification,
  selectedItems,
  setSelectedItems,
}) {
  const toastRef = useRef(null);
  const toastDetail = {
    type: 'custom',
    animationType: 'slide-in',
    autoHide: true,
    duration: 2000,
    placement: 'bottom',
  };
  return (
    <View style={s.menuContainer}>
      <ScrollView style={s.column}>
        {menuCategories.map((category) => {
          return (
            <TouchableOpacity
              key={category}
              style={{padding: 10}}
              onPress={() => setSelectedClassification(category)}>
              <Text>{category}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      <ScrollView style={s.body}>
        {menu.map((item) => {
          if (item.category === selectedClassification) {
            return (
              <TouchableOpacity
                key={item.id}
                style={s.menuBodyItem}
                onPress={() => {
                  let itemExists = false;
                  let index = 0;
                  selectedItems.forEach((element, i) => {
                    if (element.id === item.id) {
                      itemExists = true;
                      index = i;
                    }
                  });
                  if (itemExists) {
                    let newSelectedItems = [...selectedItems];
                    newSelectedItems[index].quantity++;
                    setSelectedItems(newSelectedItems);
                  } else {
                    setSelectedItems([
                      ...selectedItems,
                      {id: item.id, name: item.name, note: '', quantity: 1},
                    ]);
                  }
                  toastRef.current.show(
                    `${item.name} añadido a la comanda`,
                    toastDetail,
                  );
                }}>
                <Text>{item.name}</Text>
              </TouchableOpacity>
            );
          }
        })}
      </ScrollView>
      <Toast
        ref={toastRef}
        renderType={{
          custom: (props) => (
            <View style={s.toastStyle}>
              <Text style={{color: Colors.white}}>{props.message}</Text>
            </View>
          ),
        }}
      />
    </View>
  );
}

const s = StyleSheet.create({
  menuContainer: {
    flexDirection: 'row',
    height: '100%',
    gap: 0,
  },
  column: {
    width: '30%',
    backgroundColor: Colors.gray6,
    paddingTop: 10,
    marginRight: 10,
    height: '100%',
  },
  body: {
    width: '70%',
    backgroundColor: Colors.white,
    padding: 10,
    height: '100%',
  },
  menuBodyItem: {
    backgroundColor: Colors.gray6,
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  toastStyle: {
    backgroundColor: Colors.green,
    padding: 10,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
    marginBottom: 10,
    position: 'absolute',
    bottom: 100,
  },
});
