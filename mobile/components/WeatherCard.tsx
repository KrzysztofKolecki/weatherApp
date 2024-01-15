import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';

interface WeatherCardProps {
  city: string;
  weatherData: {
    temp: number;
    humidity: number;
    windSpeed: number;
    conditions: string;
  };
}

const WeatherCard: React.FC<WeatherCardProps> = ({ city, weatherData }) => {
  return (
    <Card style={styles.card}>
      <Card.Content>
        <Text style={styles.title}>{city}</Text>
        <Text>Temperature: {weatherData.temp}°C</Text>
        <Text>Humidity: {weatherData.humidity}%</Text>
        <Text>Wind Speed: {weatherData.windSpeed} m/s</Text>
        <Text>Conditions: {weatherData.conditions}</Text>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default WeatherCard;