import React, { FunctionComponent, KeyboardEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { InfinitySpin } from 'react-loader-spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFrown } from '@fortawesome/free-solid-svg-icons';
import { CityWeather } from './CityWeather';
import { AppDispatch, RootState } from '../store/store';
import { fetchWeatherForCities, setQuery } from '../store/weatherSlice';

const Weather: FunctionComponent = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { query, cities, errors, loading } = useSelector((state: RootState) => state.weather);

  const search = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      dispatch(fetchWeatherForCities(query));
    }
  };

  return (
    <div>
      <h1 className="app-name">
        Weather App<span>🌤</span>
      </h1>
      <div className="search-bar">
        <input
          type="text"
          className="city-search"
          placeholder="Search City.."
          name="query"
          value={query}
          aria-label="Mestá na vyhľadanie"
          onChange={(event) => dispatch(setQuery(event.target.value))}
          onKeyDown={search}
        />
        <p className="search-help">Zadajte mestá oddelené čiarkou a stlačte Enter.</p>
      </div>

      {loading && (
        <>
          <br />
          <br />
          <InfinitySpin width="100px" />
        </>
      )}

      {errors.length > 0 && (
        <div className="error-message" role="alert">
          <FontAwesomeIcon icon={faFrown} />
          {errors.map((error) => <p key={error}>{error}</p>)}
        </div>
      )}

      <div className="weather-results">
        {cities.map((city) => (
          <CityWeather
            key={`${city.id}-${city.name}`}
            name={city.name}
            country={city.sys.country}
            description={city.weather[0].description}
            icon={city.weather[0].icon}
            windSpeed={city.wind.speed}
            temp={city.main.temp}
            pressure={city.main.pressure}
            humidity={city.main.humidity}
          />
        ))}
      </div>
    </div>
  );
};

export default Weather;
