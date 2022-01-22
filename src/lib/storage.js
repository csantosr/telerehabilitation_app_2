import AsyncStorage from '@react-native-community/async-storage';

class Storage {
  static instance = new Storage();

  set = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
      return true;
    } catch (error) {
      console.error(`Storage store error: ${error}`);
      return false;
    }
  };

  get = async key => {
    try {
      return await AsyncStorage.getItem(key);
    } catch (error) {
      console.error(`Storage get error: ${error}`);
      throw Error(error);
    }
  };

  multiGet = async keys => {
    try {
      return await AsyncStorage.multiGet(keys);
    } catch (error) {
      console.error(`Storage multiGet error: ${error}`);
      throw Error(error);
    }
  };

  getAllKeys = async () => {
    try {
      return await AsyncStorage.getAllKeys();
    } catch (error) {
      console.error(`Storage getAllKeys error: ${error}`);
      throw Error(error);
    }
  };

  remove = async key => {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Storage remove error: ${error}`);
      return false;
    }
  };

  getToken = async () => {
    await this.get('access_token');
  };
  setToken = async token => {
    await this.set('access_token', token);
  };
  removeToken = async () => {
    await this.remove('access_token');
  };
}

export default Storage;
