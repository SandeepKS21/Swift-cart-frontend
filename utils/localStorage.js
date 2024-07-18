import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveItem = async (name, value) => {
  try {
    await AsyncStorage.setItem(name, value);
    return true;
  } catch (e) {
    console.log("async storage error", e);
    return false;
  }
};

export const readItem = async (itemName) => {
  try {
    const value = await AsyncStorage.getItem(itemName);
    return value;
  } catch (e) {
    // error reading value
    console.log("async storage error", e);
    return false;
  }
};

export const removeItem = async (itemName) => {
  try {
    await AsyncStorage.removeItem(itemName);
    return true;
  } catch (e) {
    // error reading value
    console.log("async storage error", e);
    return false;
  }
};
