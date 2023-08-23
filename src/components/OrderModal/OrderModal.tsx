import React from 'react';
import {
  View,
  StyleSheet,
  Modal,
  Text,
  Pressable,
  Dimensions,
  ScrollView,
} from 'react-native';

export default function OrderModal({visible, setVisible}) {
  const {height} = Dimensions.get('window');
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        setVisible(!visible);
      }}>
      <View style={s.centeredView}>
        <View style={[s.modal, {height: height, marginTop: height / 2}]}>
          <View style={s.closeContainer}>
            <Pressable onPress={() => setVisible(!visible)}>
              <Text>X</Text>
            </Pressable>
          </View>
          <ScrollView>
            <Text>Hola</Text>
            <Text>Hola</Text>
            <Text>Hola</Text>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const s = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0, .4)',
  },
  modal: {
    backgroundColor: 'white',
    width: '100%',
    borderRadius: 20,
    elevation: 5,
    padding: 20,
  },
  closeContainer: {
    alignItems: 'flex-end',
  },
});
