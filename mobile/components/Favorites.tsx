import React from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';

interface FavoritesProps {
  favorites: Array<any>;
  onRemoveFavorite: (index: number) => void;
  onShowWeather: (city: string) => void;
}

const Favorites: React.FC<FavoritesProps> = ({ favorites, onRemoveFavorite, onShowWeather }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favorites</Text>
      <FlatList
        data={favorites}
        keyExtractor={(index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.favoriteItem}>
            <Text>{item.city}</Text>
            <Button title="Show Weather" onPress={() => onShowWeather(item.city)} />
            <Button title="Remove" onPress={() => onRemoveFavorite(index)} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  favoriteItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
});

export default Favorites;