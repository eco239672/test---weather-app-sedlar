import React, { FunctionComponent } from 'react';
import { toDate } from './tools';
import { CityWeatherProps } from '../types/CityWeather';

export const CityWeather: FunctionComponent<CityWeatherProps> = ({ name, country, description, icon, windSpeed, temp, pressure, humidity }) => (
  <article className="weather-card">
    <div className="city-name">
      <h2>{name}, <span>{country}</span></h2>
    </div>
    <div className="date"><span>{toDate()}</span></div>
    <div className="icon-temp">
      <img
        src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
        alt={description}
      />
      {Math.round(temp)}<sup className="deg">&deg;C</sup>
    </div>
    <div className="des-wind">
      <p>{description.toUpperCase()}</p>
      <p>Rýchlosť vetra: {windSpeed} m/s</p>
      <p>Tlak vzduchu: {pressure} hPa</p>
      <p>Vlhkosť vzduchu: {humidity} %</p>
    </div>
  </article>
)

