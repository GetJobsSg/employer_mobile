import AsyncStorage from '@react-native-async-storage/async-storage';

export enum StorageKey {
  'ACCESS_TOKEN' = 'ACCESS_TOKEN',
}

export const setItem = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
    return true;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
    return false;
  }
};

export const getItem = async (key: string) => {
  try {
    const item = await AsyncStorage.getItem(key);
    return item;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
    return null;
  }
};

export const removeItem = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
    return false;
  }
};

export const clear = async () => {
  try {
    await AsyncStorage.clear();
    return true;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
    return false;
  }
};
