import React, { useState, useEffect } from 'react';
import { TextInput, Button, StyleSheet, View, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import axios from 'axios';
import { Provider as PaperProvider } from 'react-native-paper';
import WeatherCard from './components/WeatherCard';
import Favorites from './components/Favorites';
import { getFavorites, saveFavorite, removeFavorite } from './utils/storage';

const App = () => {
  const [searchInput, setSearchInput] = useState('');
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState<WeatherData>();
  const [favorites, setFavorites] = useState<Array<Favorite>>([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    const storedFavorites = await getFavorites();
    setFavorites(storedFavorites || []);
  };

  const fetchWeatherData = async (city: string) => {
    if (city) {
      try {
        const weatherResponse = await axios.get(
          `http://localhost:3000/weather?city=${city}`
        );
        const newWeatherData = weatherResponse.data;
        setCity(city);
        setWeatherData(newWeatherData);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    }
  };

  const addToFavorites = () => {
    if (city && weatherData && !favorites.some(favorite => favorite.city === city)) {
      const newFavorite: Favorite = {
        city,
        weather: weatherData,
      };

      saveFavorite(newFavorite);
      setFavorites([...favorites, newFavorite]);
    }
  };

  const removeFavoriteCity = (index: number) => {
    removeFavorite(index);
    loadFavorites();
  };

  return (
    <PaperProvider>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.container}>
          <ScrollView>
            <TextInput
              style={styles.input}
              placeholder="Enter city"
              value={searchInput}
              onChangeText={(text) => setSearchInput(text)}
            />
            <Button title="Get Weather" onPress={() => fetchWeatherData(searchInput)} />
            {weatherData && (
              <>
                <WeatherCard city={city} weatherData={weatherData} />
                <Button title="Add to Favorites" onPress={addToFavorites} />
              </>
            )}
          </ScrollView>
          <Favorites
            favorites={favorites}
            onRemoveFavorite={removeFavoriteCity}
            onShowWeather={(selectedCity) => {
              fetchWeatherData(selectedCity);
            }}
          />
        </View>
      </KeyboardAvoidingView>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 50,
    margin: 10,
    paddingLeft: 10,
  },
});

export default App;
