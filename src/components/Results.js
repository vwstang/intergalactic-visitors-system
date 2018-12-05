import React, { Component } from "react";
import EarthPhotos from "./EarthPhotos";
import EarthWeather from "./EarthWeather";

class Results extends Component {
  render() {
    return (
      <div className="results">
        {/* NASA API results */}
        <EarthPhotos lng={this.props.lng} lat={this.props.lat} />
        <EarthWeather lng={this.props.lng} lat={this.props.lat} />
      </div>
    )
  }
}

export default Results;
