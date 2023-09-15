import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  BackHandler,
  TextInput,
} from 'react-native';
import Colors from '../../utils/Colors';
import Icons from '../../utils/Icons';
import DefaultButton from '../Buttons/DefaultButton';

export default function Login({navigation}) {
  BackHandler.addEventListener('hardwareBackPress', () => {
    return true;
  });

  const passref = useRef(null);

  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPass] = useState('');

  return (
    <View style={s.container}>
      <Text style={s.title}>azulapp</Text>

      <View style={s.loginContainerContainer}>
        <View style={s.loginTextContainer}>
          <Text style={s.loginContainerText}>Iniciar sesión</Text>
        </View>
        <View style={s.loginContainer}>
          {/* <TouchableOpacity
            onPress={() => navigation.navigate('Main')}
            style={s.loginGoogleButton}>
            <Text>Iniciar sesión con Google</Text>
            <Image source={Icons.GoogleLogo} style={s.logos} />
          </TouchableOpacity> */}
          <TextInput
            placeholder="Email"
            onChange={(e) => setEmail(e.nativeEvent.text)}
            keyboardType="email-address"
            aria-valuetext="email"
            autoCapitalize="none"
            autoCorrect={false}
            onSubmitEditing={() => {
              passref.current.focus();
            }}
            returnKeyType="next"
          />
          <TextInput
            placeholder="Contraseña"
            onChange={(e) => setPass(e.nativeEvent.text)}
            secureTextEntry={secureTextEntry}
            aria-valuetext="password"
            autoCapitalize="none"
            autoCorrect={false}
            ref={passref}
            returnKeyType="done"
            maxLength={30}
          />
          <DefaultButton
            text="Iniciar sesión"
            onPress={() => {}}
            style={s.button}
          />
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={s.loginContainerText}>Registrarse</Text>
        </TouchableOpacity>
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
    paddingTop: 20,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: '80%',
    height: 250,
    borderColor: '#1453b8',
    borderWidth: 2,
    justifyContent: 'space-evenly',
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
  button: {
    marginTop: 20,
    backgroundColor: '#1453b8',
  },
});
