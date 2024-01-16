import React, { useState, useEffect } from 'react';
import { TextInput, Button, StyleSheet, View, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import axios from 'axios';
import { Provider as PaperProvider } from 'react-native-paper';
import WeatherCard from './components/WeatherCard';
import Favorites from './components/Favorites';
import { getFavorites, saveFavorite, removeFavorite } from './utils/storage';
import { API_KEY } from '@env';

const App: React.FC<any> = () => {
  const [searchInput, setSearchInput] = useState('');
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState<any>({});
  const [favorites, setFavorites] = useState<Array<any>>([]);

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
        const geoCodingResponse = await axios.get(
          `http://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city)}&limit=1&appid=${API_KEY}`
        );

        const location = geoCodingResponse.data[0];

        const weatherResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&units=metric&appid=${API_KEY}`
        );

        const { main, wind, weather } = weatherResponse.data;
        const newWeatherData = {
          temp: main.temp,
          humidity: main.humidity,
          windSpeed: wind.speed,
          conditions: weather[0].description,
        };

        setWeatherData(newWeatherData);
        setCity(city);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    }
  };

  const addToFavorites = () => {
    if (city !== '' && !favorites.some(favorite => favorite.city === city)) {
      const newFavorite = {
        city,
        ...weatherData,
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
            {Object.keys(weatherData).length > 0 && (
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
