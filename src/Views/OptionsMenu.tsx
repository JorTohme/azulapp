import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Colors from '../utils/Colors';
import {getUserSession} from '../utils/Helper';
import Icons from '../utils/Icons';
import OptionButton from '../components/OptionButton/OptionButton';

export default function OptionsMenu({navigation}) {
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);

  useEffect(() => {
    getUserSession().then((res) => {
      setName(res.name);
      setEmail(res.email);
      setLoading(false);
    });
  }, []);

  return (
    <ScrollView style={s.container}>
      {loading ? (
        <ActivityIndicator size="large" color={Colors.selected2} />
      ) : (
        <View style={s.userDataContainer}>
          <View style={s.nameLetterCircle}>
            {name && name.length > 0 && (
              <Text style={s.nameLetter}>{name[0].toUpperCase()}</Text>
            )}
          </View>
          <Text style={s.name}>{name}</Text>
          <Text style={s.email}>{email}</Text>
        </View>
      )}

      <View style={s.optionButtonContainer}>
        <OptionButton
          text="Dar de baja mi cuenta"
          icon={Icons.CloseAccount}
          onPress={() => navigation.navigate('DeleteAccount')}
          chevronDisabled
        />
        <OptionButton
          text="Cerrar Sesión"
          icon={Icons.Logout}
          onPress={() => navigation.navigate('LogoutScreen')}
          chevronDisabled
        />
      </View>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  safeAreaView: {
    backgroundColor: Colors.selected2,
  },
  container: {
    backgroundColor: Colors.white,
    paddingHorizontal: 15,
    paddingTop: 50,
    paddingBottom: 50,
  },
  userDataContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  nameLetterCircle: {
    width: 75,
    height: 75,
    padding: 0,
    marginBottom: 10,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: Colors.selected2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameLetter: {
    fontSize: 30,
    fontWeight: 'bold',
    padding: 0,
    margin: 0,
  },
  name: {
    fontSize: 20,
    marginBottom: 5,
  },
  email: {
    fontSize: 14,
    color: Colors.darkGray,
  },
  optionButtonContainer: {
    gap: 10,
  },
});
