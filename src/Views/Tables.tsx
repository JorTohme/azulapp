import React, {useContext, useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
  RefreshControl,
  StatusBar,
} from 'react-native';
import Colors from '../utils/Colors';
import Icons from '../utils/Icons';
import {Views} from '../utils/Types';
import Table from '../components/Table/Table';
import TableListView from '../components/TableListView/TableListView';
import SpaceSelector from '../components/SpaceSelector/SpaceSelector';
import {useUpdateSpecialButtonAction, useUpdateSpaces} from '../utils/Hooks';
import {StoreContext} from '../store/StoreProvider';
import Header from '../components/Header/Header';
import Images from '../utils/Images';

function SelectorBar({selectedView, setSelectedView}) {
  const [store, dispatch] = useContext(StoreContext);

  useEffect(() => {
    if (selectedView === Views.Map) {
      dispatch({
        type: 'SET_SPECIAL_BUTTON_ACTIVE',
        payload: true,
      });

      dispatch({
        type: 'SET_SPECIAL_BUTTON_ACTION',
        payload: () => console.log('Special button pressed'),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedView]);
  return (
    <View style={selectorStyles.viewContainer}>
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

export default function Tables({navigation, loading}) {
  const [selectedView, setSelectedView] = useState(Views.Map);
  const [selectedSpace, setSelectedSpace] = useState(1);
  const [refreshing, setRefreshing] = useState(false);

  const [spaces, setSpaces] = useState([]);

  const [store] = useContext(StoreContext);

  const updateSpaces = useUpdateSpaces(setRefreshing);
  const updateSpecialButtonAction = useUpdateSpecialButtonAction();

  useEffect(() => {
    updateSpecialButtonAction(() => console.log('Special button pressed'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setSpaces(store.spaces);
  }, [store.spaces]);

  const onRefresh = () => {
    // reconnect socket
    setRefreshing(true);
    updateSpaces();
  };

  return (
    <SafeAreaView style={s.safeAreaView}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.selected2} />
      <View style={{backgroundColor: Colors.white}}>
        <Header title="Mesas" navigation={navigation} />
        <SelectorBar
          selectedView={selectedView}
          setSelectedView={spaces.length > 0 ? setSelectedView : () => {}}
        />
        <SpaceSelector
          data={spaces}
          setSelectedSpace={setSelectedSpace}
          loading={loading}
        />
      </View>
      {selectedView === Views.Map ? (
        <View style={s.container}>
          <ScrollView
            style={s.scrollView}
            contentContainerStyle={s.mapView}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            {!loading &&
              spaces.length > 0 &&
              spaces[selectedSpace - 1].tables.map((table) => {
                return <Table key={table.id} data={table} shape="square" map />;
              })}
            {!loading && spaces.length === 0 && (
              <View style={s.errorContainer}>
                <Image source={Images.NoTables} style={s.image} />
                <Text style={s.errorText}>
                  No pudimos cargar las mesas, {'\n'} intentá actualizar
                </Text>
              </View>
            )}
          </ScrollView>
        </View>
      ) : (
        <TableListView data={spaces} selectedSpace={selectedSpace - 1} />
      )}
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: Colors.selected2,
  },
  container: {
    backgroundColor: Colors.gray6,
    height: '100%',
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
  image: {
    width: 300,
    height: 300,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  errorText: {
    fontSize: 18,
    color: Colors.selected2,
    textAlign: 'center',
  },
});

const selectorStyles = StyleSheet.create({
  viewContainer: {
    paddingHorizontal: 15,
    paddingTop: 12,
    paddingBottom: 8,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.gray,
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
