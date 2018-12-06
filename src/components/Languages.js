import React, { Component } from "react";
import "country-language";

const CountryLanguage = require('country-language');


class Language extends Component {
	constructor() {
		super();
		this.state = {
			language: "",
			languageISO: "",
			value: "",
			country: "",
		}
	};

	handleChange = (event) => {

		let selectionValue = event.target.value;
		this.setState({ 
			languageISO: selectionValue 
		},
		() => {  
			this.getCountries(selectionValue)
			}			
		);


	}

	getCountries = (lang) => {
		// console.log(lang)
		
		const countries = CountryLanguage.getLanguage(lang, function (err, language) {

			if (err) {
				console.log(err);
			} else {
				return language.countries.map(country => {
					return country.name
				});

			}
		});

		console.log(countries);
		const randomChoice = this.randomCountry(countries);

		this.setState({
			country: randomChoice
		})

	}

	randomCountry = (list) => list[Math.floor(Math.random() * list.length)];


	render() {
		console.log(this.state.country);

		return (
			<select name="chosenLanguage" id="chosenLanguage" 
			// value={this.state.value} 
			onChange={this.handleChange}>
					<option value="">Select a language</option>
				{
					CountryLanguage.getLanguages().map((language, i) => {
						// console.log(language.name);
						return(
							<option value={language.iso639_3} key={language.iso639_3}>{language.name}</option>
						)
					})
				}
				
			</select>
				
			)
	}
}

export default Language;
