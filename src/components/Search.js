import React, { Component } from "react";
import apiKeys from '../data/secrets';
import ReactDependentScript from 'react-dependent-script';
import LocationSearchInput from "./Autocomplete";
import Results from "./Results";


class Search extends Component {
  constructor() {
    super();
    this.state = {
      qryLat: 0,
      qryLng: 0,
      showResults: false,
      placeQuery: "",
      specValue: "",
      langValue: "",
      wthrValue: ""
    };
  }


  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
      showResults: false
    })
  }

  updateSpecValue = value => {
    this.setState({
      specValue: value,
      showResults: false
    })
  }

  updateCoords = coords => {
    this.setState({
      qryLat: coords.lat,
      qryLng: coords.lng
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    console.log(this.state.qryLat);
    console.log(this.state.qryLng);

    this.setState({
      showResults: true
    })
  }

  isDisabled = whichInput => {
    switch (whichInput) {
      case "specValue":
        if (this.state.langValue !== "" || this.state.wthrValue !== "") {
          return true;
        }
        return false;
      case "langValue":
        if (this.state.specValue !== "" || this.state.wthrValue !== "") {
          return true;
        }
        return false;
      case "wthrValue":
        if (this.state.specValue !== "" || this.state.langValue !== "") {
          return true;
        }
        return false;
      default:
        console.log("What?");
        break;
    }
  }

  showResults = ready => {
    if (ready) {
      window.location.href = `/results/${this.state.qryLat}/${this.state.qryLng}`;
    }
  }

  render() {
    return (
      <main>
        <h1>IVS</h1>
        <form action="" onSubmit={this.handleSubmit}>
          <label
            htmlFor="placeQuery" className="visuallyhidden"
          >
            Search by place
          </label>
          <ReactDependentScript
            scripts={[`https://maps.googleapis.com/maps/api/js?key=${apiKeys.googlemaps}&libraries=places`]}
          >
            <LocationSearchInput
              updateCoords={this.updateCoords}
              updateSpecValue={this.updateSpecValue}
              isDisabled={this.isDisabled}
            />
          </ReactDependentScript>
          <label htmlFor="langValue" className="visuallyhidden">Search by language</label>
          <input
            id="langValue"
            type="text"
            value={this.state.langValue}
            placeholder="Select an Earth Language"
            onChange={this.handleChange}
            disabled={this.isDisabled("langValue")}
          />
          <label htmlFor="wthrValue" className="visuallyhidden">Search by climate</label>
          <input
            id="wthrValue"
            type="text"
            value={this.state.wthrValue}
            placeholder="Select an Earth Climate"
            onChange={this.handleChange}
            disabled={this.isDisabled("wthrValue")}
          />
          <input type="submit" value="Submit" className="visuallyhidden"/>
        </form>
        {/* Can pass the longitudinal and latitudinal coordinates as props to EarthPhotos to get destination photo results from Flickr */}
        {this.showResults(this.state.showResults)}
      </main>
    )
  }
}

export default Search;
