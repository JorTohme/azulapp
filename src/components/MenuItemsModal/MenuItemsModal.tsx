import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Modal,
  Dimensions,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import Colors from '../../utils/Colors';
import getMenu from '../../utils/Connections/getMenu';

export default function MenuItemsModal({visible, setVisible}) {
  const {height} = Dimensions.get('window');
  // const [loading, setLoading] = useState(true);
  const [menu, setMenu] = useState([]);
  const [menuClassifications, setMenuClassifications] = useState([]);
  const [selectedClassification, setSelectedClassification] = useState('');

  useEffect(() => {
    getMenu().then((data) => {
      setMenu(data);

      let classifications = [];
      data.forEach((item) => {
        if (!classifications.includes(item.classification)) {
          classifications.push(item.classification);
        }
      });

      setMenuClassifications(classifications);
      // setLoading(false);
    });
  }, []);

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
          <View style={s.menuContainer}>
            <ScrollView style={s.column}>
              {menuClassifications.map((classification) => {
                return (
                  <TouchableOpacity
                    key={classification}
                    style={{padding: 10}}
                    onPress={() => setSelectedClassification(classification)}>
                    <Text>{classification}</Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
            <ScrollView style={s.body}>
              {menu.map((item) => {
                if (item.classification === selectedClassification) {
                  return (
                    <TouchableOpacity key={item.id} style={s.menuBodyItem}>
                      <Text>{item.name}</Text>
                    </TouchableOpacity>
                  );
                }
              })}
            </ScrollView>
          </View>

          <View style={s.buttonsContainer}>
            <TouchableOpacity
              style={s.buttonCancel}
              onPress={() => setVisible(!visible)}>
              <Text style={s.buttonCancelText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={s.buttonAccept} onPress={() => {}}>
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
});
