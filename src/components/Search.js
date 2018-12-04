import React, { Component } from "react";
import EarthPhotos from "./EarthPhotos";
import axios from "axios";
import apiKeys from '../data/secrets';
import LocationSearchInput from "./Autocomplete"





class Search extends Component {
  constructor() {
    super();
    this.state = {
      placeQuery: ""
    }
  }


  getLocation = () => {
    axios.get("https://maps.googleapis.com/maps/api/geocode/json", {
      params: {
        key: apiKeys.googlemaps,
        outputFormat: 'json',
        address: this.state.placeQuery,
        // location: "Toronto,ON",
      }
    }).then((res) => {
      console.log(res)
      // console.log('muffin')
    })
  }

  componentDidMount() {
    console.log(`I'm alive!`)



  }




  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log('hi')

    this.getLocation();

    // this.setState({
    //   placeQuery: ""
    // })
  }



  render() {
    return (
      <main>
        <h2>Hello!!</h2>
        <p>Mapquest is so grown up wow</p>
        <form action="" onSubmit={this.handleSubmit}>
          <label
            htmlFor="placeQuery">What continent would you like to visit on Earth?</label>
          {/* <input
            id="placeQuery"
            type="text"
            className="Autocomplete"
            /> */}
          <PlacesAutocomplete onChange={this.handleChange} value={this.state.placeQuery}/>





          <label
            htmlFor="userLang">What languages are you interested in?</label>
          <input
            id="userLang"
            type="text" />
          <label
            htmlFor="userWeather">What weather are you comfortable with?</label>
          <input
            id="userWeather"
            type="text" /> 
          <input type="submit" value="Submit"/>
          
        </form>


      <script>

        {

        
  }


      </script>



        <script type="text/javascript" src={`https://maps.googleapis.com/maps/api/js?key=${apiKeys.googlemaps}&libraries=places`}></script>

        {/* Can pass the longitudinal and latitudinal coordinates as props to EarthPhotos to get destination photo results from Flickr */}
        <EarthPhotos />
      </main>
    )
  }
}

export default Search;
