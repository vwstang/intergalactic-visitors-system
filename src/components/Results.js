import React, { Component } from "react";
import { Link } from "react-router-dom";
import NASAPhotos from "./NASAPhotos";
import EarthPhotos from "./EarthPhotos";
import EarthWeather from "./EarthWeather";
import firebase from "../data/firebase"
import swal from '@sweetalert/with-react';

const provider = new firebase.auth.GoogleAuthProvider();
const auth = firebase.auth();

class Results extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      newPlace: {},
      placeEntries: {},
    };
  }

  login = () => {
    auth.signInWithPopup(provider)
      .then((result) => {
        const user = result.user;
        this.setState({
          user: user
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

  savedList = () => {
    swal(
      <div>
        <h1>Future Destinations List</h1>
        <ul >
          {
            this.state.placeEntries ?
              Object.entries(this.state.placeEntries).map((entry) => {
                return (
                  <li>
                    <a href={`../../${entry[1].name}/${entry[1].lat}/${entry[1].lng}`} style={{ border: "blue", color: "black", textDecoration: "none" }}>
                      {entry[1].name}
                      <p>Latitude: {entry[1].lat}</p>
                      <p>Longitude: {entry[1].lng}</p>
                    </a>
                  </li>
                )
              })
              :
                <p>You have no saved places</p>
              }
        </ul>
      </div>
    )
  }





  handleNewPlace = e => {

    if (this.state.user) {
      const newPlace = {
        name: this.props.match.params.name,
        lat: this.props.match.params.lat,
        lng: this.props.match.params.lng,
      };

      const dbRef = firebase.database().ref(`/${this.state.user.uid}`);

      dbRef.once("value").then(snapshot => {

        const snapDB = snapshot.val();
        console.log(snapDB, 'database')
        console.log(newPlace, 'cake')


        this.setState({
          placeEntries: snapDB
        })

        console.log(this.state.placeEntries, 'muffin')

        if (this.state.placeEntries) {
          let alreadyExists = false;
          Object.entries(this.state.placeEntries).forEach((entry) => {

            if (entry[1].lat === newPlace.lat && entry[1].lng === newPlace.lng) {
              alreadyExists = true;
              // console.log("IT MATCHES")
            }

          })
          if (alreadyExists) {
            swal({
              title: "Already in List!",
              text: "This location is already in your destination list.",
              icon: "warning"
            })
          } else {
            dbRef.push(newPlace)
            swal({
              title: "Destination added!",
              text: "Click the list icon to view all destinations saved!",
              icon: "success"
            })
          }
        } else {
          dbRef.push(newPlace)
          swal({
            title: "Destination added!",
            text: "Click the list icon to view all destinations saved!",
            icon: "success"
          })
        }
      })


    } else {
      swal({
        title: "Request Denied",
        text: "You must login to save this destination place",
        icon: "error"
      })
    }
  }

  formatName = name => {
    if (name.indexOf("@") === -1) {
      return name;
    } else {
      return `${name.slice(0, name.indexOf("@"))}, ${name.slice(name.indexOf("@") + 1)}`;
    }
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          user: user
        }, () => {
          // create reference specific to user
          this.dbRef = firebase.database().ref(`${this.state.user.uid}`);

          this.dbRef.on('value', (snapshot) => {
            this.setState({
              placeEntries: snapshot.val()
            })
          });
        })
      }
    })
  }

  render() {
    return (
      <div>
        <main className="results">
          <div className="results-header">
            <nav  className="results-nav">
              <ul>
                <li>
                  {
                    this.state.user ?
                      <button onClick={this.logout}><img src={this.state.user.photoURL} alt="" className="profile-picture" /></button> :
                      <button onClick={this.login}><img src="/assets/alien-icon.png" alt="Login" /></button>
                  }
                </li>

                <li>
                  <a href="/" className="search-icon"><img src="/assets/search-icon.png" alt="Search" /></a>
                </li>

                { this.state.user ?
                  <li>
                    <button className="list-icon" onClick={this.savedList}>
                  <img src="/assets/list-icon.png" alt="Saved Places" />
                  </button>
                </li>
                 : null}

                <li>
                  <button onClick={this.appInfo}>
                    <img src="/assets/about-icon.png" alt="About IVS" />
                  </button>
                </li>
              </ul>
            </nav>
            <h2>Visit...</h2>
            <div className="place-heading">
              <h1>{this.formatName(this.props.match.params.name)}</h1>
            </div>
            <div className="details clearfix">
              <div className="sat">
                <div className="zoom"></div>
                <div>
                  <NASAPhotos
                    lng={this.props.match.params.lng}
                    lat={this.props.match.params.lat}
                  />
                  <div className="overlay">
                    <p className="sat-caption">Satellite View</p>
                  </div>
                </div>
              </div>
              <div className="stats">
                <div className="info">
                  <EarthWeather
                    lng={this.props.match.params.lng}
                    lat={this.props.match.params.lat}
                  />
                  {/* show lat and lng to 2 decimal points */}
                  <p>{"{ "}{parseFloat(Number(this.props.match.params.lng)).toFixed(2)}/{parseFloat(Number(this.props.match.params.lat)).toFixed(2)}{" }"}</p>
                </div>
                <div className="share">
                  <button className="save-icon" onClick={this.handleNewPlace}>
                    <img src="/assets/save-icon.png" alt="" />
                  </button>
                  <a href={`http://twitter.com/share?url=http%3A%2F%2Fproject6-ivs.firebaseapp.com%2Fresults%2F${this.props.match.params.name}%2F${this.props.match.params.lat}%2F${this.props.match.params.lat}&text=Check%20out%20my%20future%20Earth%20destination!`} target="_blank" rel="noopener noreferrer">
                    <img className="twitter-icon" src="/assets/twitter-icon.png" alt="" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <h2 className="gallery-heading">Snapshots</h2>
          <EarthPhotos
            lng={this.props.match.params.lng}
            lat={this.props.match.params.lat}
          />
        </main>
        <footer>
          <h3>Intergalactic Visitors System: Earth</h3>
          <p>Developed by Iman, Sally and Vincent</p>
        </footer>
      </div>
    )
  }
}

export default Results;
