import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  BackHandler,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from 'react-native';
import Colors from '../../utils/Colors';
import DefaultButton from '../Buttons/DefaultButton';
import GeneralLoader from '../Loaders/GeneralLoader';
import login from '../../utils/Connections/login';
import {saveUserSession} from '../../utils/Helper';
import {User} from '../../utils/Types';

export default function Login({navigation}) {
  BackHandler.addEventListener('hardwareBackPress', () => {
    return true;
  });

  const passref = useRef(null);

  const [loading, setLoading] = useState(false);

  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPass] = useState('');

  const [emailError, setEmailError] = useState(false);
  const [passError, setPassError] = useState(false);

  function checkEmail(e: string) {
    return (
      e.includes('@') && e.includes('.') && e.length >= 5 && e.length <= 50
    );
  }

  function checkPassword(pass: string) {
    return pass.length >= 6;
  }

  function submit() {
    setEmailError(false);
    setPassError(false);

    if (checkEmail(email) && checkPassword(password)) {
      setLoading(true);
      login(email, password).then((res) => {
        if (res.success) {
          const user: User = {
            name: res.name,
            email: email,
            password: password,
            organization: res.organization,
          };
          saveUserSession(user);
          setLoading(false);

          navigation.navigate('Main');
        }
        setLoading(false);
      });
      return;
    }

    Keyboard.dismiss();

    setEmailError(!checkEmail(email));
    setPassError(!checkPassword(password));
  }

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.blue} />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={s.container}>
          <Text style={s.title}>azulapp</Text>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={s.avoidingView}>
            <View style={s.loginContainerContainer}>
              <View style={s.loginTextContainer}>
                <Text style={s.loginContainerText}>Iniciar sesión</Text>
              </View>
              <View style={s.loginContainer}>
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
                  maxLength={50}
                  style={[s.input, emailError && s.inputError]}
                  // Web
                  autoFocus={Platform.OS === 'web' ? true : false}
                />
                <View>
                  <TextInput
                    placeholder="Contraseña"
                    onChange={(e) => setPass(e.nativeEvent.text)}
                    secureTextEntry={secureTextEntry}
                    aria-valuetext="password"
                    autoCapitalize="none"
                    autoCorrect={false}
                    ref={passref}
                    returnKeyType="done"
                    maxLength={50}
                    style={[s.input, passError && s.inputError]}
                  />
                  <TouchableOpacity
                    onPress={() => setSecureTextEntry(!secureTextEntry)}>
                    <Text style={s.hidePasswordText}>
                      {secureTextEntry
                        ? 'Mostrar contraseña'
                        : 'Ocultar contraseña'}
                    </Text>
                  </TouchableOpacity>
                </View>

                <DefaultButton
                  text="Iniciar sesión"
                  onPress={
                    () => submit()
                    // navigation.navigate('Main')
                  }
                  style={s.button}
                />
              </View>
              <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={s.loginContainerText}>Registrarse</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
      <GeneralLoader loading={loading} />
    </>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: 'center',
    paddingTop: 60,
  },
  title: {
    color: '#1453b8',
    fontSize: 90,
    fontWeight: 'bold',
    letterSpacing: -5,
  },
  avoidingView: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: '60%',
  },
  loginContainerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  loginContainer: {
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: '85%',

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
  input: {
    borderWidth: 1,
    borderColor: '#1453b8',
    borderRadius: 5,
    marginVertical: 12,
    paddingHorizontal: 10,
    paddingVertical: 12,
    width: '100%',

    // Web
    maxWidth: 400,
  },
  inputError: {
    borderColor: Colors.selected2,
    backgroundColor: '#f8d7da',
  },

  hidePasswordText: {
    textAlign: 'right',
    fontSize: 14,
    color: '#1453b8',
  },
});
