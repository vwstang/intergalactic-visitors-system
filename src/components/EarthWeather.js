import React, { Component } from "react";
import apiKeys from "../data/secrets";
import axios from "axios";

class EarthWeather extends Component {
  constructor() {
    super();
    this.state = {
      weather: "",
      humidity: 0,
      pressure: 0,
      currTemp: 0,
      minTemp: 0,
      maxTemp: 0,
      windSpeed: 0,
      windDir: ""
    };
  }

  // Converts degrees to direction (i.e. North, North East, East, South East, South, South West, West, North West)
  // Each of the directions take up 45 degrees, so North would be +/- 22.5 degrees (or 337.5 to 360 degrees and 0 to 22.5 degrees), and so on and so forth.
  getWindDir = degree => {
    if (degree <= 22.5 || degree >= 337.5) {
      return "N";
    } else if (degree <= 67.5) {
      return "NE";
    } else if (degree <= 112.5) {
      return "E";
    } else if (degree <= 157.5) {
      return "SE";
    } else if (degree <= 202.5) {
      return "S";
    } else if (degree <= 247.5) {
      return "SW";
    } else if (degree <= 292.5) {
      return "W";
    } else {
      return "NW";
    }
  }

  // Converts meters/second to kilometers/hour
  getWindSpd = speed => speed * 3600 / 1000;

  getWeather = () => {
    const apiKey = apiKeys.openWeatherMap;
    const apiURL = "https://api.openweathermap.org/data/2.5/weather";
    const coordsLon = this.props.lng;
    const coordsLat = this.props.lat;

    axios.get(apiURL, {
      params: {
        appid: apiKey,
        lat: coordsLat,
        lon: coordsLon,
        units: "metric"
      }
    }).then(res => {
      const wthrRes = res.data;
      this.setState({
        weather: wthrRes.weather[0].main,
        humidity: wthrRes.main.humidity,
        pressure: wthrRes.main.pressure, // Results in hPa
        currTemp: wthrRes.main.temp, // Results in Celsius (as Axios request returns results in metric system)
        minTemp: wthrRes.main.temp_min,
        maxTemp: wthrRes.main.temp_max,
        windSpeed: this.getWindSpd(wthrRes.wind.speed), // Results in m/s, converted to km/h
        windDir: this.getWindDir(wthrRes.wind.deg) // Results in degrees, converted to N/NE/E/SE/S/SW/W/NW
      })
    });
  }

  componentDidMount() {
    this.getWeather();
  }

  render() {
    const { weather, humidity, pressure, currTemp, minTemp, maxTemp, windSpeed, windDir } = this.state;
    return (
      <div className="weather-info">
        <p>{`${weather}`}</p>
        <p>Current: {currTemp}&deg;C</p>
        <p>Low: {minTemp}&deg;C</p>
        <p>High: {maxTemp}&deg;C</p>
        <p>Wind speed: {windSpeed} km/h</p>
        <p>Wind direction: {windDir}</p>
        <p>Humidity: {humidity}</p>
        <p>Pressure: {pressure} hPa</p>
      </div>
    )
  }
}

export default EarthWeather;
