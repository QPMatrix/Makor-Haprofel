import {supabase} from '../utils/supbase';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const createUser = async (name: string, phoneNumber: string) => {
  try {
    const existingUser = await getUser(phoneNumber);
    if (existingUser) {
      console.log('User already exists');

      return true;
    }
    const {data, error} = await supabase
      .from('Users')
      .insert([{name: name, phone_number: phoneNumber}]);

    if (error) {
      console.error('Error creating user:', error);
      throw error;
    }
    if (data) {
      await AsyncStorage.setItem('user', JSON.stringify(data));
      console.log('User created and stored in AsyncStorage');
      return true;
    }
  } catch (error) {
    console.error('Error in createUser:', error);
    return false;
  }
};

export const getUser = async (phoneNumber: string) => {
  try {
    const {data, error} = await supabase
      .from('Users')
      .select('*')
      .eq('phone_number', phoneNumber);

    if (error) {
      console.error('Error getting user:', error);
      throw error;
    }
    if (data && data.length > 0) {
      await AsyncStorage.setItem('user', JSON.stringify(data[0]));
      console.log('User retrieved and stored in AsyncStorage');
      return true;
    }
  } catch (error) {
    console.error('Error in getUser:', error);
    return false;
  }
};
