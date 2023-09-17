import AsyncStorage from '@react-native-async-storage/async-storage';
import {User} from './Types';

export async function saveUserSession(user: User): Promise<void> {
  await AsyncStorage.setItem('userData', JSON.stringify(user));
}

export async function getUserSession(): Promise<User> {
  const user = await AsyncStorage.getItem('userData');
  return user ? <User>JSON.parse(user) : null;
}

export async function Logout(navigation): Promise<void> {
  await AsyncStorage.removeItem('userData');
  navigation.navigate('Login');
}
