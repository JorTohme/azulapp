import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Modal,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  Pressable,
} from 'react-native';
import Icons from '../../utils/Icons';
import Colors from '../../utils/Colors';

const TableFree = () => {
  const [people, setPeople] = useState(1);

  return (
    <View style={s.viewContainer}>
      <View style={s.buttonDefault}>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 20}}>
          <View style={s.buttonIconBackground}>
            <Image source={Icons.PeopleIcon} style={s.buttonIcon} />
          </View>
          <View>
            <Text>Personas </Text>
            <Text>{people}</Text>
          </View>
        </View>
        <View style={s.plusminusContainer}>
          <TouchableOpacity
            style={s.plusminus}
            onPress={() => (people > 1 ? setPeople(people - 1) : null)}>
            <Image source={Icons.Minus} style={s.plusminusIcon} />
          </TouchableOpacity>
          <TouchableOpacity
            style={s.plusminus}
            onPress={() => setPeople(people + 1)}>
            <Image source={Icons.Plus} style={s.plusminusIcon} />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={s.buttonOpen} activeOpacity={0.8}>
        <Text style={s.buttonOpenText}>Abrir Mesa</Text>
      </TouchableOpacity>
    </View>
  );
};

export default function OrderModal({visible, setVisible}) {
  const {height} = Dimensions.get('window');

  const tableData = {state: 'free'};

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        setVisible(!visible);
      }}>
      <View style={s.centeredView}>
        <Pressable
          style={s.modalBackground}
          onPress={() => setVisible(!visible)}
        />
        <View
          style={[
            s.modal,
            {
              height: height * 0.6,
              marginTop: height * 0.5,
              paddingBottom: height * 0.08,
            },
          ]}>
          <View style={s.closeContainer}>
            <TouchableOpacity onPress={() => setVisible(!visible)}>
              <Image source={Icons.CloseIcon} style={{width: 28, height: 28}} />
            </TouchableOpacity>
          </View>
          {tableData.state === 'free' ? <TableFree /> : null}
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
  },
  modalBackground: {
    zIndex: 100,
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0, .6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: 'white',
    width: '100%',
    borderRadius: 20,
    elevation: 5,
    padding: 20,
    zIndex: 110,
  },
  closeContainer: {
    alignItems: 'flex-end',
  },
  viewContainer: {
    // backgroundColor: Colors.pink,
    justifyContent: 'space-between',
    height: '90%',
  },
  buttonDefault: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
    paddingVertical: 9,
    marginTop: 20,
    flexDirection: 'row',
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
});
