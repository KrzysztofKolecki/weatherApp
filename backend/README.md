# Weather App - Backend

This is the backend application for the Weather App, developed using Nest.js and Node.js.

## Features

- RESTful APIs for handling frontend requests
- Integration with an external weather API (OpenWeatherMap)
- Error handling and data validation
- Caching to reduce API calls for frequently requested locations
- Unit tests
- Swagger Documentation

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed
- npm (Node Package Manager) installed
- Nest.js installed (`npm install -g @nestjs/cli`)

## How to run the App

1. Install dependencies

  ```bash
    cd backend
    npm install
  ```

2.  Configuration

Ensure that you have the necessary environment variables set. Create a `.env` file in the root of the project with the following:

  ```bash
    API_KEY=your_openweathermap_api_key
  ```

Replace `your_openweathermap_api_key` with your actual OpenWeatherMap API key.

3. Running the App

To start the application, run:

  ```bash
    npm run start
  ```
  The app will be running at `http://localhost:3000`.


## Testing

To run tests, use the following command:

  ```bash
    npm run test
  ```

## API Endpoints

`GET /weather`: Get weather data for a city.

Example:

```bash
GET /weather?city=Sopot
```

## Swagger Documentation

The API is documented using Swagger. Access the Swagger UI at:

```bash
http://localhost:3000/swagger
```