import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Modal,
  Dimensions,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Colors from '../../utils/Colors';

import getMenu from '../../utils/Connections/getMenu';
import ShowMenuItems from './ShowMenuItems';
import ConfirmOrder from './ConfirmOrder';

import postOrder from '../../utils/Connections/postOrder';

export default function MenuItemsModal({visible, setVisible, tableNumber}) {
  const {height} = Dimensions.get('window');
  // const [loading, setLoading] = useState(true);
  const [menu, setMenu] = useState([]);
  const [menuCategories, setMenuCategories] = useState([]);
  const [selectedClassification, setSelectedClassification] = useState('');

  const [selectedItems, setSelectedItems] = useState([]);

  const [confirmScreen, setConfirmScreen] = useState(false);

  useEffect(() => {
    getMenu().then((data) => {
      setMenu(data);

      let category = [];
      data.forEach((item) => {
        if (!category.includes(item.category)) {
          category.push(item.category);
        }
      });

      setMenuCategories(category);
      // setLoading(false);
    });
  }, []);

  const handleOrderSubmit = () => {
    const orderData = {
      waiterName: 'Guada',
      tableNumber: tableNumber,
      orderItems: [...selectedItems],
    };

    postOrder({data: orderData}).then((data) => {
      if (data) {
        setVisible(false);
        setSelectedItems([]);
      }
    });
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        setVisible(!visible);
      }}
      style={[s.modal, {height: height}]}>
      <SafeAreaView style={s.modal}>
        <View style={s.container}>
          {!confirmScreen ? (
            <ShowMenuItems
              menu={menu}
              menuCategories={menuCategories}
              selectedClassification={selectedClassification}
              setSelectedClassification={setSelectedClassification}
              selectedItems={selectedItems}
              setSelectedItems={setSelectedItems}
            />
          ) : (
            <ConfirmOrder
              selectedItems={selectedItems}
              setSelectedItems={setSelectedItems}
            />
          )}

          <View style={s.buttonsContainer}>
            <TouchableOpacity
              style={s.buttonCancel}
              onPress={() =>
                confirmScreen
                  ? setConfirmScreen(false)
                  : (setVisible(!visible), setSelectedItems([]))
              }>
              <Text style={s.buttonCancelText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                s.buttonAccept,
                selectedItems.length === 0 && s.buttonAcceptDisabled,
              ]}
              disabled={selectedItems.length === 0}
              onPress={() => {
                confirmScreen ? handleOrderSubmit() : setConfirmScreen(true);
              }}>
              <Text style={s.buttonAcceptText}>Aceptar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const s = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 200,
    backgroundColor: 'white',
  },
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: Colors.white,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 80,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: Colors.white,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -10,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3.65,

    elevation: 7,
  },
  buttonAccept: {
    backgroundColor: '#f77839',
    padding: 10,
    paddingHorizontal: 80,
    borderRadius: 8,
  },
  buttonAcceptDisabled: {
    opacity: 0.5,
  },
  buttonCancel: {
    padding: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: Colors.gray,
  },
  buttonAcceptText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 15,
  },
  buttonCancelText: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 15,
  },
});
