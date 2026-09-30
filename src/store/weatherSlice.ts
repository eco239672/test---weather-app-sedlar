import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { WeatherResponse } from '../types/WeatherResponse';

const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather';
const appId = process.env.REACT_APP_OPENWEATHER_API_KEY;

type SearchResult = {
  cities: WeatherResponse[];
  errors: string[];
};

type WeatherState = {
  query: string;
  cities: WeatherResponse[];
  errors: string[];
  loading: boolean;
};

const initialState: WeatherState = {
  query: '',
  cities: [],
  errors: [],
  loading: false,
};

export const fetchWeatherForCities = createAsyncThunk<SearchResult, string>(
  'weather/fetchWeatherForCities',
  async (rawQuery) => {
    if (!appId) {
      return {
        cities: [],
        errors: ['Chýba OpenWeatherMap API kľúč. Nastavte REACT_APP_OPENWEATHER_API_KEY v súbore .env.local.'],
      };
    }

    const cityNames = Array.from(
      new Set(
        rawQuery
          .split(',')
          .map((city) => city.trim())
          .filter(Boolean)
      )
    );

    if (!cityNames.length) {
      return { cities: [], errors: ['Zadajte aspoň jedno mesto.'] };
    }

    const results = await Promise.all(
      cityNames.map(async (city) => {
        try {
          const response = await axios.get<WeatherResponse>(weatherUrl, {
            params: { q: city, units: 'metric', appid: appId },
          });
          return { city, weather: response.data };
        } catch {
          return { city };
        }
      })
    );

    return {
      cities: results.flatMap((result) => (result.weather ? [result.weather] : [])),
      errors: results
        .filter((result) => !result.weather)
        .map((result) => `Mesto „${result.city}“ sa nenašlo.`),
    };
  }
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherForCities.pending, (state) => {
        state.loading = true;
        state.cities = [];
        state.errors = [];
      })
      .addCase(fetchWeatherForCities.fulfilled, (state, action) => {
        state.loading = false;
        state.cities = action.payload.cities;
        state.errors = action.payload.errors;
      })
      .addCase(fetchWeatherForCities.rejected, (state) => {
        state.loading = false;
        state.errors = ['Počasie sa nepodarilo načítať. Skúste to znova.'];
      });
  },
});

export const { setQuery } = weatherSlice.actions;
export default weatherSlice.reducer;
