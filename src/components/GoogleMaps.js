import React, { Component } from "react";
import axios from "axios";
import apiKeys from '../data/secrets';

class GoogleMaps extends Component {
	constructor() {
		super();
		this.state = {
			placeQuery: "",

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
				console.log('muffin')
			})
		}

	render() {


		return (
			<main>
				<h1>hi there</h1>
			</main>
		)
	}
}

export default GoogleMaps;
