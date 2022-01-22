import AsyncStorage from '@react-native-community/async-storage';

export const isSignedIn = async () => {
  let token = null;
  try {
    token = await AsyncStorage.getItem('access_token');
  } catch (error) {
    throw Error(error);
  }
  if (token) {
    return true;
  } else {
    return false;
  }
};
