import React, { Component } from "react";
import apiKeys from '../data/secrets';
import ReactDependentScript from 'react-dependent-script';
import LocationSearchInput from "./Autocomplete";
import Results from "./Results";
import Language from "./Languages";
import axios from "axios";
import firebase from "../data/firebase"


const provider = new firebase.auth.GoogleAuthProvider();
const auth = firebase.auth();

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
      wndrValue: "",
      Language: "",
      LanguageISO: "",
      user: null
    };
  }

  login = () => {
    auth.signInWithPopup(provider)
      .then((result) => {
        console.log('success!')
        const user = result.user;
        this.setState({
          user
        });
      });
  }

  logout = () => {
    auth.signOut()
      .then(() => {
        this.setState({
          user: null
        });
      });
  }

  // componentDidMount() {
  //   auth.onAuthStateChanged((user) => {
  //     if (user) {
  //       this.setState({
  //         user: user
  //       }, () => {
  //         // create reference specific to user
  //         this.dbRef = firebase.database().ref(`${this.state.user.uid}`);

  //         this.dbRef.on('value', (snapshot) => {

  //         });
  //       })
  //     }
  //   })

  // }


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

    axios.get("https://maps.googleapis.com/maps/api/geocode/json", {
      params: {
        key: apiKeys.googlemaps,
        outputFormat: 'json',
        address: value,
      }
    }).then((res) => {

      this.setState({
        langValue: value,
        showResults: false,
        qryLat: res.data.results[0].geometry.location.lat,
        qryLng: res.data.results[0].geometry.location.lng,
      })

    })
    // This should send "value" to another function which will do something that gets coordinates for a random city
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
        if (this.state.langValue !== "" || this.state.wndrValue !== "") {
          return true;
        }
        return false;
      case "langValue":
        if (this.state.specValue !== "" || this.state.wndrValue !== "") {
          return true;
        }
        return false;
      case "wndrValue":
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
      window.location.href = `/results/${this.state.specValue}${this.state.langValue}${this.state.wndrValue}/${this.state.qryLat}/${this.state.qryLng}`;
    }
  }


  render() {
    return (
      <main class="search">
        <nav>
          <ul>
            <li>
              <a href="#" tabIndex="0">
              {this.state.user ? <button onClick={this.logout}><img src={this.state.user.photoURL} alt="" /></button> : <button onClick={this.login}><img src="/assets/alien-icon.png" alt="Login" /></button>}
              </a>
            </li>
            <li>
              <a href="#" tabIndex="0"><img src="/assets/about-icon.png" alt="About IVS"/></a>
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
            isDisabled={this.isDisabled}
          />
          <label htmlFor="wndrValue" className="visuallyhidden">Search by wonders</label>
          <input
            id="wndrValue"
            type="text"
            value={this.state.wndrValue}
            placeholder="Search by Wonder"
            onChange={this.handleChange}
            disabled={this.isDisabled("wndrValue")}
          />
          <button type="submit">
            <i class="fas fa-space-shuttle" tabIndex="0"></i>
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
