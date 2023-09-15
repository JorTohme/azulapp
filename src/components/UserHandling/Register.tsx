import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Colors from '../../utils/Colors';

import registerNewUser from '../../utils/Connections/registerNewUser';

export default function Register({navigation}) {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPass] = useState('');
  const [password2, setPass2] = useState('');

  // const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  function checkEmail(e: string) {
    return e.includes('@') && e.includes('.');
  }

  function checkPassword(pass: string) {
    return pass.length >= 6;
  }

  function checkName(n: string) {
    return n.length >= 3;
  }

  function checkDoublePass(pass: string, pass2: string) {
    return pass === pass2;
  }

  function checkForm() {
    return (
      checkEmail(email) &&
      checkPassword(password) &&
      checkName(name) &&
      checkDoublePass(password, password2)
    );
  }

  function register() {
    console.log('click');
    if (checkForm()) {
      registerNewUser(email, password, name, setError, navigation);
    }
  }

  return (
    <View style={s.container}>
      <Text>Registrarse</Text>
      <View style={s.inputContainer}>
        <TextInput
          style={s.input}
          placeholder="Nombre completo"
          onChange={(e) => setName(e.nativeEvent.text)}
        />
        <TextInput
          style={s.input}
          placeholder="Email"
          keyboardType="email-address"
          onChange={(e) => setEmail(e.nativeEvent.text)}
        />
        <TextInput
          style={s.input}
          placeholder="Contraseña"
          secureTextEntry={secureTextEntry}
          onChange={(e) => setPass(e.nativeEvent.text)}
          maxLength={30}
        />
        <TextInput
          style={s.input}
          placeholder="Confirmar contraseña"
          secureTextEntry={secureTextEntry}
          onChange={(e) => setPass2(e.nativeEvent.text)}
          maxLength={30}
        />
        <TouchableOpacity onPress={() => setSecureTextEntry(!secureTextEntry)}>
          <Text>Mostrar contraseña</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => register()}>
          <Text>Registrarse</Text>
        </TouchableOpacity>
      </View>
      <Text>{error && error}</Text>
      <View>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text>Iniciar sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  inputContainer: {
    padding: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.selected2,
    borderRadius: 5,
    marginVertical: 10,
    padding: 10,
  },
});
