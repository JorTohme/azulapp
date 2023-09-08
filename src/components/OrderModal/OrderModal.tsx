import React from 'react';
import {
  View,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Dimensions,
  Image,
  Pressable,
} from 'react-native';
import Icons from '../../utils/Icons';

import TableFree from './TableFree';
import TableBusy from './TableBusy';
import TablePay from './TablePay';

export default function OrderModal({visible, setVisible, tableData}) {
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
              <Image source={Icons.CloseIcon} style={s.closeIcon} />
            </TouchableOpacity>
          </View>
          {tableData.state === 'free' && <TableFree tableData={tableData} />}
          {tableData.state === 'busy' && <TableBusy tableData={tableData} />}
          {tableData.state === 'pay' && <TablePay tableData={tableData} />}
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
  closeIcon: {
    width: 28,
    height: 28,
  },
});
