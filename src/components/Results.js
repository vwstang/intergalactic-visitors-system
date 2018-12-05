import React, { Component } from "react";
import { Link } from "react-router-dom";
import NASAPhotos from "./NASAPhotos";
import EarthPhotos from "./EarthPhotos";
import EarthWeather from "./EarthWeather";

class Results extends Component {
  render() {
    return (
      <main className="results">
        <h1>Intergalactic Visitors System</h1>
        <h2>Your Results</h2>
        <Link className="searchAgain" to="/">Search Again</Link>
        <NASAPhotos
          lng={this.props.match.params.lng}
          lat={this.props.match.params.lat}
        />
        <EarthPhotos
          lng={this.props.match.params.lng}
          lat={this.props.match.params.lat}
        />
        <EarthWeather
          lng={this.props.match.params.lng}
          lat={this.props.match.params.lat}
        />
      </main>
    )
  }
}

export default Results;
