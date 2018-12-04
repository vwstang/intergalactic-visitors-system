import React, { Component } from 'react';
import './App.scss';
import axios from "axios";

// Import Components
import Search from "./components/Search.js";


class App extends Component {
	constructor(){
		super();
		this.state = {
			placeQuery: ""
		}
	}

	getLocation = () => {
		axios.get("http://www.mapquestapi.com/geocoding/v1/address", {
			params: {
				key: "kwlpGO2AgMDxz3W5HXBulygVAPUK6m8r",
				location: placeQuery,
				// maxResults: 1,
				outFormat: 'json',
			}
		}).then((res) => {
			console.log(res)
			console.log('muffin')
		})
	}

	componentDidMount() {
		this.getLocation();
		console.log(`I'm alive!`)
	}



	render() {
		return (
			<div className="App">
				<Search />
			</div>
		);
	}
}

export default App;
