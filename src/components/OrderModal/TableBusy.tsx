import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import MenuItemsModal from '../MenuItemsModal/MenuItemsModal';
import Icons from '../../utils/Icons';
import Colors from '../../utils/Colors';
import {StoreContext} from '../../store/StoreProvider';
import {usePayTable, useUpdateSpecialButtonAction} from '../../utils/Hooks';

interface Props {
  tableData: any;
  styles?: any;
}

export default function TableBusy({tableData, styles}: Props) {
  const [menuModal, setMenuModal] = useState(false);
  const [orderList, setOrderList] = useState([]);

  const [store] = useContext(StoreContext);

  const updateSpecialButtonAction = useUpdateSpecialButtonAction();
  const payTable = usePayTable();

  useEffect(() => {
    setOrderList(store.orders);
  }, [store.orders]);

  useEffect(() => {
    updateSpecialButtonAction(() => setMenuModal(true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <View style={[s.viewContainer, styles]}>
        <View style={s.buttonDefault}>
          <View style={s.iconContainer}>
            <View style={s.buttonIconBackground}>
              <Image source={Icons.PeopleIcon} style={s.buttonIcon} />
            </View>
            <Text style={s.font16}>
              {tableData.people !== 1
                ? `${tableData.people} personas`
                : `${tableData.people} persona`}
            </Text>
          </View>
        </View>
        <ScrollView style={s.mt10} contentContainerStyle={s.scrollViewContent}>
          {orderList.map((order) => {
            if (order.table_id === tableData.id) {
              return (
                <View key={order.id} style={[s.buttonDefault, s.item]}>
                  <View style={s.iconContainer}>
                    <View style={s.buttonIconBackground}>
                      <Image source={Icons.Clock} style={s.buttonIcon} />
                    </View>
                    <Text style={s.font16}>
                      {order.created_at
                        .split('T')[1]
                        .split('.')[0]
                        .slice(0, -3)}
                    </Text>
                  </View>
                  {order.orderItems.map((item) => {
                    return (
                      <View key={item.menuItem.id}>
                        <View style={s.iconContainer}>
                          <View style={s.buttonIconBackground}>
                            <Image
                              source={Icons.TabFoodActive}
                              style={s.buttonIcon}
                            />
                          </View>
                          <Text style={[s.font16, s.width75]}>
                            {item.quantity} {item.menuItem.name}
                          </Text>
                        </View>
                      </View>
                    );
                  })}
                </View>
              );
            }
          })}
        </ScrollView>
        {!styles && (
          <TouchableOpacity
            style={s.buttonOpen}
            activeOpacity={0.8}
            onPress={() => {
              setMenuModal(true);
            }}>
            <Text style={s.buttonOpenText}>Añadir comanda</Text>
          </TouchableOpacity>
        )}
        {styles && (
          <TouchableOpacity
            style={s.buttonPre}
            activeOpacity={0.8}
            onPress={() => {
              payTable(tableData.id);
            }}>
            <Text style={s.buttonOpenText}>Precuenta</Text>
          </TouchableOpacity>
        )}
      </View>
      <MenuItemsModal
        visible={menuModal}
        setVisible={setMenuModal}
        tableNumber={tableData.id}
      />
    </>
  );
}

const s = StyleSheet.create({
  viewContainer: {
    // backgroundColor: Colors.pink,
    justifyContent: 'space-between',
    height: '90%',
    paddingTop: 10,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  buttonOpen: {
    backgroundColor: '#f77839',
    borderRadius: 8,
    padding: 10,
    elevation: 2,
    marginTop: 20,
  },
  buttonPre: {
    backgroundColor: Colors.pink,
    borderRadius: 8,
    padding: 10,
    elevation: 2,
    marginTop: 20,
  },
  buttonOpenText: {
    backgroundColor: 'transparent',
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
  },
  buttonDefault: {
    backgroundColor: Colors.gray6,
    borderRadius: 8,
    padding: 10,
    paddingVertical: 6,
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
  buttonIcon: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
  },
  buttonIconBackground: {
    backgroundColor: Colors.white,
    borderRadius: 50,
    padding: 10,
  },
  iconContainer: {flexDirection: 'row', alignItems: 'center', gap: 20},
  font16: {fontSize: 16},
  width75: {maxWidth: '75%'},
  mt10: {marginTop: 10},
  scrollViewContent: {
    paddingBottom: 10,
    paddingHorizontal: '3%',
  },
  item: {
    height: 'auto',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: 20,
    gap: 10,
  },
});
