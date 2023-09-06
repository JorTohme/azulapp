import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import Colors from '../../utils/Colors';
import Icons from '../../utils/Icons';
export default function ShowMenuItems({
  selectedItems,
  setSelectedItems,
  // menu,
  // menuCategories,
  // selectedClassification,
  // setSelectedClassification,
}) {
  const handleMinus = (item) => {
    const newItems = [...selectedItems];
    const index = newItems.findIndex((i) => i.id === item.id);
    if (newItems[index].quantity > 1) {
      newItems[index].quantity--;
      setSelectedItems(newItems);
    } else {
      newItems.splice(index, 1);
      setSelectedItems(newItems);
    }
  };

  const handlePlus = (item) => {
    const newItems = [...selectedItems];
    const index = newItems.findIndex((i) => i.id === item.id);
    newItems[index].quantity++;
    setSelectedItems(newItems);
  };
  return (
    <View style={s.container}>
      <KeyboardAvoidingView behavior="position">
        <ScrollView contentContainerStyle={s.scrollviewContainer}>
          {selectedItems.map((item) => {
            return (
              <View style={s.itemDetail} key={item.id}>
                <View style={s.buttonDefault}>
                  <View style={s.iconContainer}>
                    <View style={s.buttonIconBackground}>
                      <Image source={Icons.PeopleIcon} style={s.buttonIcon} />
                    </View>
                    <View>
                      <Text>{item.name}</Text>
                      <Text>{item.quantity}</Text>
                    </View>
                  </View>
                  <View style={s.plusminusContainer}>
                    <TouchableOpacity
                      style={s.plusminus}
                      onPress={() => {
                        handleMinus(item);
                      }}>
                      <Image source={Icons.Minus} style={s.plusminusIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={s.plusminus}
                      onPress={() => {
                        handlePlus(item);
                      }}>
                      <Image source={Icons.Plus} style={s.plusminusIcon} />
                    </TouchableOpacity>
                  </View>
                </View>
                <TextInput
                  style={s.textInput}
                  placeholder="Nota"
                  onChange={(e) => {
                    const newItems = [...selectedItems];
                    const index = newItems.findIndex((i) => i.id === item.id);
                    newItems[index].note = e.nativeEvent.text;
                    setSelectedItems(newItems);
                  }}
                />
              </View>
            );
          })}
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gray6,
  },
  scrollviewContainer: {paddingBottom: 100, paddingHorizontal: 10},
  itemDetail: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
    paddingVertical: 10,
    paddingTop: 20,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '5%',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 2,
  },
  buttonDefault: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  buttonOpen: {
    backgroundColor: '#f77839',
    borderRadius: 8,
    padding: 10,
    elevation: 2,
    marginTop: 20,
  },
  buttonOpenText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
  },
  buttonIcon: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
  },
  buttonIconBackground: {
    backgroundColor: Colors.gray6,
    borderRadius: 50,
    padding: 12,
  },
  plusminusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 15,
  },
  plusminus: {
    backgroundColor: Colors.gray6,
    borderRadius: 50,
    padding: 10,
  },
  plusminusIcon: {
    width: 23,
    height: 23,
    resizeMode: 'contain',
  },
  iconContainer: {flexDirection: 'row', alignItems: 'center', gap: 20},
  textInput: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginTop: 10,
  },
});
