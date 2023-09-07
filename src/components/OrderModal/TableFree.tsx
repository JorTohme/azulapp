import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import Colors from '../../utils/Colors';
import Icons from '../../utils/Icons';
import {useUpdateSpaces} from '../../utils/Hooks';

import putTableOpen from '../../utils/Connections/putTableOpen';

interface TableFreeProps {
  tableData: any;
  styles?: any;
}

export default function TableFree({tableData, styles}: TableFreeProps) {
  const [people, setPeople] = useState(1);

  const updateSpaces = useUpdateSpaces();

  const openTableParams = () => {
    return {
      id: tableData.id,
      people: people,
    };
  };

  return (
    <View style={[s.viewContainer, styles]}>
      <View style={s.buttonDefault}>
        <View style={s.iconContainer}>
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
            onPress={() => (people < 30 ? setPeople(people + 1) : null)}>
            <Image source={Icons.Plus} style={s.plusminusIcon} />
          </TouchableOpacity>
        </View>
      </View>
      {/* <Text>Comentarios:</Text> */}
      <TouchableOpacity
        style={s.buttonOpen}
        activeOpacity={0.8}
        onPress={() => {
          putTableOpen(openTableParams()).then(() => {
            updateSpaces();
          });
        }}>
        <Text style={s.buttonOpenText}>Abrir Mesa</Text>
      </TouchableOpacity>
    </View>
  );
}

const s = StyleSheet.create({
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
  iconContainer: {flexDirection: 'row', alignItems: 'center', gap: 20},
});
