import AsyncStorage from "@react-native-async-storage/async-storage";

const FAVORITES_KEY = 'favorites';

export const saveFavorite = async (favorite: any) => {
  try {
    let favorites = await getFavorites();
    if (!favorites) {
      favorites = [];
    }
    favorites.push(favorite);
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  } catch (error) {
    console.error('Error saving favorite:', error);
  }
};

export const getFavorites = async () => {
  try {
    const favorites = await AsyncStorage.getItem(FAVORITES_KEY);
    return favorites ? JSON.parse(favorites) : null;
  } catch (error) {
    console.error('Error getting favorites:', error);
    return null;
  }
};

export const removeFavorite = async (index: number) => {
  try {
    let favorites = await getFavorites();
    if (favorites) {
      favorites.splice(index, 1);
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    }
  } catch (error) {
    console.error('Error removing favorite:', error);
  }
};