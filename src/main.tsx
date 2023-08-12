import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Dimensions, TouchableOpacity, Image } from 'react-native'
import Colors from './utils/Colors'
import Icons from './utils/Icons';
import { Views } from './utils/Types';
import Header from './components/Header/Header'
import Table from './components/Table/Table'
import TableListView from './components/TableListView/TableListView';
import {Mock} from './utils/Mock';
import SpaceSelector from './components/SpaceSelector/SpaceSelector';

function SelectorBar ({selectedView, setSelectedView}) {
  return (
    <View style={selectorStyles.viewContainer}>
    <Text>Ver mesas como: </Text>
    <View style={selectorStyles.selectors}>
      <TouchableOpacity style={selectorStyles.selector}
      onPress={() => setSelectedView(Views.Map)}
      >
        <Image source={Icons.Map} style={{width: 16, height: 16}}/>
        <Text style={
          selectedView == Views.Map ? selectorStyles.selectorTextSelected : selectorStyles.selectorTextUnselected
        }>
          Mapa
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={selectorStyles.selector}
      onPress={() => setSelectedView(Views.List)}
      >
        <Image source={Icons.List} style={{width: 17, height: 17}}/>
        <Text style={
          selectedView == Views.List ? selectorStyles.selectorTextSelected : selectorStyles.selectorTextUnselected
        }>
          Lista
        </Text>
      </TouchableOpacity>
    </View>
  </View>
  )
}

export default function Main () {
  const { width, height } = Dimensions.get('window');

  const [selectedView, setSelectedView] = useState(Views.Map);
  const [selectedSpace, setSelectedSpace] = useState(0);

  const tables = [1, 2, 3, 4, 5, 6, 7, 8,9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
  return (
    <View style={s.container}>
      <Header title='Mesas'/>
      <SelectorBar selectedView={selectedView} setSelectedView={setSelectedView} />
      <View>
        <SpaceSelector data={Mock} setSelectedSpace={setSelectedSpace} />
      </View>
      {
        selectedView == Views.Map ? (
        <View>
          <ScrollView style={s.scrollView} contentContainerStyle={s.mapView}>
            {
              Mock[selectedSpace].tables.map((table, index) => {
                return (<Table key={index} state='free' shape='square' id={table.id} map/>)
              })
            }
          </ScrollView>
        </View>
        ) : (
          <TableListView data={Mock} selectedSpace={selectedSpace}/>
        )
      }
    </View>
  )
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
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
  }
})

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
})
