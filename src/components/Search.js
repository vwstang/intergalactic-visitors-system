import React, { Component } from "react";
import EarthPhotos from "./EarthPhotos";
// import axios from "axios";
import apiKeys from '../data/secrets';
import LocationSearchInput from "./Autocomplete"
import EarthWeather from "./EarthWeather";
import ReactDependentScript from 'react-dependent-script';



class Search extends Component {
	constructor() {
		super();
		this.state = {
			placeQuery: "",

		}
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

		this.setState({
		  placeQuery: ""
		})
	}


	
	render() {
		

		return (
			<main>

				


				<h2>Hello!!</h2>
				<p>Mapquest is so grown up wow</p>
				<form action="" onSubmit={this.handleSubmit}>
					<label
						htmlFor="placeQuery">What continent would you like to visit on Earth?</label>

					<ReactDependentScript
						scripts={[`https://maps.googleapis.com/maps/api/js?key=${apiKeys.googlemaps}&libraries=places`]}
					>
						<LocationSearchInput/>
					</ReactDependentScript>

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




				{/* Can pass the longitudinal and latitudinal coordinates as props to EarthPhotos to get destination photo results from Flickr */}
				{/* <EarthPhotos /> */}
				<EarthWeather />
			</main>
		)
	}
}

export default Search;
