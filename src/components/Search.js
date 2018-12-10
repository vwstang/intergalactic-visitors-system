import React, { Component } from "react";
import apiKeys from '../data/secrets';
import ReactDependentScript from 'react-dependent-script';
import LocationSearchInput from "./Autocomplete";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import Language from "./Languages";
import Wonders from "./Wonders";
import firebase from "../data/firebase";
import swal from '@sweetalert/with-react'


const provider = new firebase.auth.GoogleAuthProvider();
const auth = firebase.auth();

class Search extends Component {
  constructor() {
    super();
    this.state = {
      specValue: "",
      langValue: "",
      wndrValue: "",
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

  appInfo = () => {
    swal(
      <div>
        <h1>The Intergalactic Visitors System welcomes you!</h1>
        <p>
          Welcome to Earth! Search for destination places on Earth by place, language, or by wonder (i.e. what Earthlings consider noteworthy). Login to save and view a list of your favourite destination places!
        </p>
        <p>(Remember to use your perception filter while visiting!)</p>
      </div>
    )
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
      [e.target.id]: e.target.value
    })
  }

  updateSpecValue = (address) => {
    this.setState({
      specValue: address
    })
  }

  updateLangValue = (value) => {
    this.setState({
      langValue: value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();

    geocodeByAddress(`${this.state.specValue}${this.state.langValue}${this.state.wndrValue}`)
      .then(res => {
        return getLatLng(res[0])
      })
      .then(latLng => {
        window.location.href = `/results/${this.state.specValue}${this.state.langValue}${this.state.wndrValue}/${latLng.lat}/${latLng.lng}`;
      })
      .catch(err => console.error('Error', err));
	}

  isDisabled = (whichInput) => {
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

  render() {
    return (
      <main className="search">
        <nav className="search-nav">
          <ul>
            <li>
              {
                this.state.user ?
                  <button onClick={this.logout}><img src={this.state.user.photoURL} alt="" className="profile-picture" /></button> :
                  <button onClick={this.login}><img src="/assets/alien-icon.png" alt="Login" /></button>
                }
            </li>
            <li>
              <img src="/assets/list-icon.png" alt="Saved Places" />
            </li>
            <li>
              <button onClick={this.appInfo}><img src="/assets/about-icon.png" alt="About IVS" /></button>
            </li>
          </ul>
        </nav>
        <h1>IVS</h1>
        <form action="" onSubmit={this.handleSubmit}>
          <label
            htmlFor="specValue" className="visuallyhidden"
          >
            Search by place
          </label>
          <ReactDependentScript
            scripts={[`https://maps.googleapis.com/maps/api/js?key=${apiKeys.googlemaps}&libraries=places`]}
          >
            <LocationSearchInput
              id="specValue"
              specValue={this.state.specValue}
              updateSpecValue={this.updateSpecValue}
              isDisabled={this.isDisabled}
            />
          </ReactDependentScript>
          <label htmlFor="langValue" className="visuallyhidden">Search by language</label>
          <Language
            id="langValue"
            updateLangValue={this.updateLangValue}
            isDisabled={this.isDisabled}
          />
          <label htmlFor="wndrValue" className="visuallyhidden">Search by wonders</label>
          <Wonders
            id="wndrValue"
            handleChange={this.handleChange}
            isDisabled={this.isDisabled}
          />
          <button type="submit">
            <i className="fas fa-space-shuttle"></i>
          </button>
        </form>
        <div className="title">Intergalactic Visitors System: Earth</div>
      </main>
    )
  }
}

export default Search;
