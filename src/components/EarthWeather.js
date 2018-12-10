import React, { Component } from "react";
import apiKeys from "../data/secrets";
import Axios from "axios";

class EarthWeather extends Component {
  constructor() {
    super();
    this.state = {
      weather: "",
      humidity: 0,
      pressure: 0,
      currTemp: 0,
      minTemp: 0,
      maxTemp: 0
    };
  }

  getWeather = () => {
    const apiKey = apiKeys.openWeatherMap;
    const apiURL = "https://api.openweathermap.org/data/2.5/weather";
    const coordsLon = this.props.lng;
    const coordsLat = this.props.lat;

    Axios.get(apiURL, {
      params: {
        appid: apiKey,
        lat: coordsLat,
        lon: coordsLon,
        units: "metric"
      }
    }).then(res => {
      const wthrRes = res.data.main;
      this.setState({
        humidity: wthrRes.humidity,
        pressure: wthrRes.pressure,
        currTemp: wthrRes.temp,
        minTemp: wthrRes.temp_min,
        maxTemp: wthrRes.temp_max
      })
    });
  }

  componentDidMount() {
    this.getWeather();
  }

  render() {
    console.log(this.state.humidity);
    console.log(this.state.pressure);
    console.log(this.state.currTemp);
    console.log(this.state.minTemp);
    console.log(this.state.maxTemp);
    return (
      <div>
      </div>
    )
  }
}

export default EarthWeather;
