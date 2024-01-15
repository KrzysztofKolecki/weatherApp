import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, List } from 'react-native-paper';

interface FavoritesProps {
  favorites: Array<{
    city: string;
    temp: number;
  }>;
  onRemoveFavorite: (index: number) => void;
  onShowWeather: (city: string) => void;
}

const Favorites: React.FC<FavoritesProps> = ({ favorites, onRemoveFavorite, onShowWeather }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favorites</Text>
      <List.Section>
        {favorites.map((favorite, index) => (
          <List.Item
            key={index}
            title={favorite.city}
            description={`Temperature: ${favorite.temp}°C`}
            left={() => <List.Icon icon="weather-sunny" />}
            right={() => (
              <View style={styles.buttonContainer}>
                <Button
                  icon="eye"
                  onPress={() => onShowWeather(favorite.city)}
                >
                  Show Weather
                </Button>
                <Button
                  icon="delete"
                  onPress={() => onRemoveFavorite(index)}
                >
                  Remove
                </Button>
              </View>
            )}
          />
        ))}
      </List.Section>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
});

export default Favorites;