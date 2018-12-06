import React, { Component } from "react";
import apiKeys from '../data/secrets';
import ReactDependentScript from 'react-dependent-script';
import LocationSearchInput from "./Autocomplete";
import Results from "./Results";
import Language from "./Languages";


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
      wthrValue: "",
      Language: "",
      LanguageISO: "",
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

  updateLangValue = value => {
    this.setState({
      langValue: value,
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
    console.log(this.state.language, this.state.languageISO);

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
      <main class="search">
        <nav>
          <ul>
            <li>
              <a href="#"><img src="/assets/alien-icon.png" alt="Login"/></a>
            </li>
            <li>
              <a href="#"><img src="/assets/about-icon.png" alt="About IVS"/></a>
            </li>
          </ul>
        </nav>
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

          <Language
            id="langValue"
            type="text"
            updateLangValue={this.updateLangValue}
            value={this.state.langValue}
            placeholder="Search by Language"
            onChange={this.handleChange}
            // NEW CODE
            isDisabled={this.isDisabled}
          // NEW CODE
          />


          <label htmlFor="wthrValue" className="visuallyhidden">Search by wonder</label>
          <input
            id="wthrValue"
            type="text"
            value={this.state.wthrValue}
            placeholder="Search by Wonder"
            onChange={this.handleChange}
            disabled={this.isDisabled("wthrValue")}
          />
          <button type="submit">
            <i class="fas fa-space-shuttle"></i>
          </button>
        </form>
        {/* Can pass the longitudinal and latitudinal coordinates as props to EarthPhotos to get destination photo results from Flickr */}
        {this.showResults(this.state.showResults)}
        <div className="title">Intergalactic Visitors System: Earth</div>
      </main>
    )
  }
}

export default Search;
