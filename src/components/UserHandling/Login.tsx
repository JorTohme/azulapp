import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import Colors from '../../utils/Colors';
import Icons from '../../utils/Icons';
export default function Login({navigation}) {
  return (
    <View style={s.container}>
      <Text style={s.title}>azulapp</Text>

      <View style={s.loginContainerContainer}>
        <View style={s.loginTextContainer}>
          <Text style={s.loginContainerText}>Iniciar sesión</Text>
        </View>
        <View style={s.loginContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Main')}
            style={s.loginGoogleButton}>
            <Text>Iniciar sesión con Google</Text>
            <Image source={Icons.GoogleLogo} style={s.logos} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: 'center',
    paddingTop: 100,
  },
  title: {
    color: '#1453b8',
    fontSize: 90,
    fontWeight: 'bold',
    letterSpacing: -5,
  },
  loginContainerContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',

    top: 300,
  },
  loginContainer: {
    padding: 20,
    borderRadius: 10,
    marginVertical: 10,
    width: '80%',
    height: 250,
    borderColor: '#1453b8',
    borderWidth: 2,
    alignItems: 'center',

    // Web
    maxWidth: 400,
  },
  loginTextContainer: {
    position: 'absolute',
    top: -1,
    backgroundColor: Colors.white,
    paddingHorizontal: 10,
    borderColor: '#1453b8',
    zIndex: 10,
  },
  loginContainerText: {
    fontSize: 15,
    color: '#1453b8',
  },
  loginGoogleButton: {
    backgroundColor: Colors.white,
    width: '100%',
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logos: {
    width: 30,
    height: 30,
    position: 'absolute',
    right: 10,
    resizeMode: 'contain',
  },
});
