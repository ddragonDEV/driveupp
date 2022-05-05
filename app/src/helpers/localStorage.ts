import AsyncStorage from '@react-native-community/async-storage';

export const getItem = async <T>(key: string): Promise<T | undefined> => {
  try {
    const value = (await AsyncStorage.getItem(key)) as T | null;

    if (!value) {
      return;
    }

    try {
      return JSON.parse(value as unknown as string);
    } catch {
      return value;
    }
  } catch {}
};

export const setItem = async (
  key: string,
  value: string | any[] | object | boolean | number,
) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));

    return true;
  } catch {}

  return false;
};

export const removeItem = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);

    return true;
  } catch {}

  return false;
};
