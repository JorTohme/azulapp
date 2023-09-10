import React from 'react';
import {
  View,
  Text,
  BackHandler,
  Image,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Platform,
} from 'react-native';
import Images from '../utils/Images';
import Colors from '../utils/Colors';
import Icons from '../utils/Icons';
import NetInfo from '@react-native-community/netinfo';
const isIOS = Platform.OS === 'ios';

export default function Offline({navigation}) {
  const handleBackPress = () => {
    return true;
  };
  BackHandler.addEventListener('hardwareBackPress', handleBackPress);

  const retryConnection = () => {
    NetInfo.fetch().then((state) => {
      if (state.isConnected) {
        BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
        navigation.navigate('Login');
      }
    });
  };

  return (
    <View style={s.container}>
      <StatusBar
        barStyle={isIOS ? 'dark-content' : 'light-content'}
        backgroundColor={Colors.selected2}
      />
      <View />
      <View>
        <Text style={s.title}>
          ¡Ups! Parece que no tienes conexión a internet.
        </Text>
        <Image source={Images.Offline} style={s.image} />

        <Text style={s.subText}>
          Por favor, revisa tu conexión e inténtalo de nuevo.
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => retryConnection()}
        style={{
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 20,
        }}>
        <Image
          source={Icons.Retry}
          style={{
            width: 20,
            height: 20,
            marginRight: 5,
            resizeMode: 'contain',
          }}
        />
        <Text>Reintentar</Text>
      </TouchableOpacity>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  title: {
    color: Colors.selected2,
    fontSize: 20,
    textAlign: 'center',
  },
  subText: {
    color: Colors.selected2,
    fontSize: 16,
    textAlign: 'center',
  },
  image: {
    width: 400,
    height: 300,
  },
});
