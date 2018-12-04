import React, { Component } from "react";
import apiKeys from "../data/secrets";
import Axios from "axios";

class EarthWeather extends Component {
  constructor() {
    super();
    this.state = {
      weather: "",
      currTemp: 0,
      minTemp: 0,
      maxTemp: 0
    };
  }

  getWeather = () => {
    const apiKey = apiKeys.openWeatherMap;
    const apiURL = "https://api.openweathermap.org/data/2.5/weather";
    const coordsLon = -79.355685;
    const coordsLat = 43.641114;

    Axios.get(apiURL, {
      params: {
        appid: apiKey,
        lat: coordsLat,
        lon: coordsLon,
        units: "metric"
      }
    }).then(res => {
      console.log(res.data);
    });
  }

  render() {
    return (
      <div>
        {this.getWeather()}
      </div>
    )
  }
}

export default EarthWeather;
