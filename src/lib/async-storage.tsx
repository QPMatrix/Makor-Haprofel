import AsyncStorage from '@react-native-async-storage/async-storage';

export const getUserDetails = async () => {
  try {
    const user = await AsyncStorage.getItem('user');
    if (user) {
      return JSON.parse(user);
    }
    return null;
  } catch (error) {
    console.log('Error getting user details', error);
  }
};
export const setUserDetails = async ({
  name,
  phoneNumber,
}: {
  name: string;
  phoneNumber: string;
}) => {
  try {
    const user = JSON.stringify({name, phoneNumber});
    await AsyncStorage.setItem('user', user);
    return true;
  } catch (error) {
    console.log('Error setting user details', error);
  }
};
