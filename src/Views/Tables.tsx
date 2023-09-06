import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
  RefreshControl,
} from 'react-native';
import Colors from '../utils/Colors';
import Icons from '../utils/Icons';
import {Views} from '../utils/Types';
import Table from '../components/Table/Table';
import TableListView from '../components/TableListView/TableListView';
import SpaceSelector from '../components/SpaceSelector/SpaceSelector';

function SelectorBar({selectedView, setSelectedView}) {
  return (
    <View style={selectorStyles.viewContainer}>
      <Text>Ver mesas como: </Text>
      <View style={selectorStyles.selectors}>
        <TouchableOpacity
          style={selectorStyles.selector}
          onPress={() => setSelectedView(Views.Map)}>
          <Image source={Icons.Map} style={{width: 16, height: 16}} />
          <Text
            style={
              selectedView === Views.Map
                ? selectorStyles.selectorTextSelected
                : selectorStyles.selectorTextUnselected
            }>
            Mapa
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={selectorStyles.selector}
          onPress={() => setSelectedView(Views.List)}>
          <Image source={Icons.List} style={{width: 17, height: 17}} />
          <Text
            style={
              selectedView === Views.List
                ? selectorStyles.selectorTextSelected
                : selectorStyles.selectorTextUnselected
            }>
            Lista
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function Tables({loading, spaces, updateSpaces}) {
  const [selectedView, setSelectedView] = useState(Views.Map);
  const [selectedSpace, setSelectedSpace] = useState(1);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    updateSpaces();
    setRefreshing(false);
  };

  return (
    <SafeAreaView style={s.container}>
      <View style={{backgroundColor: Colors.background2}}>
        <SelectorBar
          selectedView={selectedView}
          setSelectedView={setSelectedView}
        />
        <View>
          {!loading && (
            <SpaceSelector data={spaces} setSelectedSpace={setSelectedSpace} />
          )}
        </View>
      </View>
      {selectedView === Views.Map ? (
        <View>
          <ScrollView
            style={s.scrollView}
            contentContainerStyle={s.mapView}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            {!loading &&
              spaces[selectedSpace - 1].tables.map((table) => {
                return (
                  <Table
                    key={table.id}
                    data={table}
                    shape="square"
                    map
                    update={updateSpaces}
                  />
                );
              })}
          </ScrollView>
        </View>
      ) : (
        <TableListView data={spaces} selectedSpace={selectedSpace - 1} />
      )}
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gray6,
  },
  scrollView: {
    height: '100%',
  },
  mapView: {
    paddingLeft: 15,
    paddingVertical: 10,
    gap: 15,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
});

const selectorStyles = StyleSheet.create({
  viewContainer: {
    paddingHorizontal: 15,
    paddingTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 10,
  },
  selectors: {
    flexDirection: 'row',
    gap: 3,
  },
  selector: {
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    gap: 3,
  },
  selectorTextSelected: {
    fontWeight: 'bold',
    color: Colors.text,
    fontSize: 15,
  },
  selectorTextUnselected: {
    color: Colors.text,
    fontSize: 15,
  },
});
