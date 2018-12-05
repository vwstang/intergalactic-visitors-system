import React, { Component } from "react";
import apiKeys from '../data/secrets';
import LocationSearchInput from "./Autocomplete";
import EarthPhotos from "./EarthPhotos";
import EarthWeather from "./EarthWeather";
import ReactDependentScript from 'react-dependent-script';
import 'country-language';
import Language from "./Languages";


class Search extends Component {
	constructor() {
		super();
		this.state = {
			qryLat: 0,
			qryLng: 0,
			placeQuery: "",
			language: "",
			languageISO: "",
			showResults: false
		};
	}


	handleChange = (e) => this.setState({ [e.target.id]: e.target.value })
	
	handleSubmit = (e) => {
		e.preventDefault();
		console.log('hi');

		console.log(this.state.qryLat);
		console.log(this.state.qryLng);
		console.log(this.state.language, this.state.languageISO)

		this.setState({
			showResults: true
		})
	}

	updateCoords = coords => {
		this.setState({
			qryLat: coords.lat,
			qryLng: coords.lng
		});
	}

	showResults = () => {
		return (
			<div className="results">
				<EarthPhotos lng={this.state.qryLng} lat={this.state.qryLat} />
				<EarthWeather lng={this.state.qryLng} lat={this.state.qryLat} />
			</div>
		)
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
						<LocationSearchInput updateCoords={this.updateCoords} />
					</ReactDependentScript>
					<label
						htmlFor="userLang">What languages are you interested in?</label>
					<input
						id="userLang"
						type="text" />

						<Language/>
						
					<label
						htmlFor="userWeather">What weather are you comfortable with?</label>
					<input
						id="userWeather"
						type="text" /> 
					<input type="submit" value="Submit"/>
				</form>
				{/* Can pass the longitudinal and latitudinal coordinates as props to EarthPhotos to get destination photo results from Flickr */}
				{
					this.state.showResults ?
						this.showResults() :
						console.log("Hello! You are not ready to view this fam")
				}
			</main>
		)
	}
}

export default Search;
