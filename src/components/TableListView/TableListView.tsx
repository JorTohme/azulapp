import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import Colors from '../../utils/Colors';
import Table from '../Table/Table';

import TableFree from '../OrderModal/TableFree';
import TableBusy from '../OrderModal/TableBusy';

export default function TableListView({data, selectedSpace}) {
  const [selectedTable, setSelectedTable] = useState(
    data[selectedSpace].tables[0] ? data[selectedSpace].tables[0] : null,
  );

  useEffect(() => {
    setSelectedTable(data[selectedSpace].tables[0]);
  }, [data, selectedSpace]);

  console.log(selectedTable.state);

  return (
    <View style={{flexDirection: 'row', height: '100%'}}>
      <ScrollView
        style={[s.scrollViewList]}
        contentContainerStyle={[s.listView, {paddingBottom: 200}]}>
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
            style={{
              backgroundColor:
                selectedTable.state === 'free'
                  ? Colors.green
                  : selectedTable.state === 'busy'
                  ? Colors.red
                  : Colors.blue,
              padding: 10,
            }}>
            <Text
              style={{
                color: Colors.white,
                fontWeight: 'bold',
                fontSize: 20,
                textAlign: 'center',
              }}>
              Mesa {selectedTable.id}
            </Text>
            <Text
              style={{
                color: Colors.white,
                fontWeight: 'bold',
                fontSize: 12,
                textAlign: 'center',
              }}>
              {selectedTable.state === 'free' && 'Libre'}
              {selectedTable.state === 'busy' && 'Ocupada'}
              {selectedTable.state === 'pay' && 'Pagando'}
            </Text>
          </View>
          {selectedTable.state === 'free' && (
            <TableFree
              tableData={selectedTable}
              styles={{
                paddingTop: 10,
                height: 200,
                paddingHorizontal: 15,
              }}
            />
          )}
          {selectedTable.state === 'busy' && (
            <TableBusy
              tableData={selectedTable}
              styles={{
                paddingHorizontal: 15,
              }}
            />
          )}
        </View>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
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
  },
  selected: {
    borderWidth: 2.5,
    borderColor: Colors.selected2,
  },
  detailContainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});
