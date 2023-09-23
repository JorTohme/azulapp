import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import Colors from '../../utils/Colors';
import Table from '../Table/Table';
import {useContext} from 'react';
import {StoreContext} from '../../store/StoreProvider';

import TableFree from '../OrderModal/TableFree';
import TableBusy from '../OrderModal/TableBusy';
import TablePay from '../OrderModal/TablePay';

export default function TableListView({data, selectedSpace}) {
  const [selectedTable, setSelectedTable] = useState(
    data[selectedSpace].tables[0] ? data[selectedSpace].tables[0] : null,
  );

  const [store, dispatch] = useContext(StoreContext);

  useEffect(() => {
    setSelectedTable(data[selectedSpace].tables[0]);
  }, [data, selectedSpace]);

  // Mantiene la mesa seleccionada si se actualiza la lista de mesas
  useEffect(() => {
    if (selectedTable) {
      setSelectedTable(
        data[selectedSpace].tables.find((table) => {
          return table.id === selectedTable.id;
        }),
      );
    }

    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, selectedTable]);

  useEffect(() => {
    if (data[selectedSpace].tables.length === 0) {
      setSelectedTable(null);
    }
  }, [data, selectedSpace]);

  useEffect(() => {
    if (selectedTable.state === 'free' || selectedTable.state === 'pay') {
      dispatch({
        type: 'SET_SPECIAL_BUTTON_ACTIVE',
        payload: false,
      });
    }

    if (selectedTable.state === 'busy') {
      dispatch({
        type: 'SET_SPECIAL_BUTTON_ACTIVE',
        payload: true,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTable]);

  const titleColors = {
    free: Colors.green,
    busy: Colors.red,
    pay: Colors.blueSecondary,
  };

  return (
    <View style={s.TableListView}>
      <ScrollView
        style={[s.scrollViewList]}
        contentContainerStyle={[s.listView]}>
        {data[selectedSpace].tables.map((table, index) => {
          return (
            <Table
              key={index}
              shape="square"
              data={table}
              styles={
                selectedTable && selectedTable.id === table.id
                  ? s.selected
                  : null
              }
              onClick={() => setSelectedTable(table)}
              map={false}
            />
          );
        })}
      </ScrollView>
      <View style={s.detailContainer}>
        <View>
          <View
            style={[
              s.title,
              {backgroundColor: titleColors[selectedTable.state]},
            ]}>
            <Text style={s.titleText}>Mesa {selectedTable.id}</Text>
            <Text style={[s.titleText, s.subtitleText]}>
              {selectedTable.state === 'free' && 'Libre'}
              {selectedTable.state === 'busy' && 'Ocupada'}
              {selectedTable.state === 'pay' && 'Pagando'}
            </Text>
          </View>
          {selectedTable.state === 'free' && (
            <TableFree tableData={selectedTable} styles={s.tableFree} />
          )}
          {selectedTable.state === 'busy' && (
            <TableBusy tableData={selectedTable} list />
          )}
          {selectedTable.state === 'pay' && (
            <TablePay tableData={selectedTable} />
          )}
        </View>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  TableListView: {
    flexDirection: 'row',
    height: '100%',
  },
  listView: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    gap: 15,
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  scrollViewList: {
    maxWidth: 100,
    minHeight: '100%',
    borderRightColor: Colors.lightGray,
    borderRightWidth: 0.5,
    backgroundColor: Colors.background2,
    paddingBottom: 200,
  },
  selected: {
    borderWidth: 2.5,
    borderColor: Colors.selected2,
  },
  detailContainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  title: {
    paddingVertical: 10,
  },
  titleText: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
  subtitleText: {
    fontSize: 12,
  },
  tableFree: {
    paddingTop: 10,
    height: 200,
    paddingHorizontal: 15,
  },
  tableBusy: {paddingHorizontal: 15},
});
