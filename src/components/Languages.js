import React, { Component } from "react";
// import axios from "axios";
import "country-language";
import { get } from "https";

const CountryLanguage = require('country-language');
const allLanguages = CountryLanguage.getLanguages();


class Language extends Component {
	constructor() {
		super();
		this.state = {
			language: "",
			languageISO: "",
			countriesData: [],
			countries: [],
			value: ""
		}
		this.handleChange = this.handleChange.bind(this);
	};

	handleChange(event) {
		// console.log(event.target.value)
		let HELLO = event.target.value;
		this.setState({ 
			languageISO: HELLO 
		},
		() => {  
		// console.log(event.target.value);
		console.log(this.state.languageISO, 'hi');
			this.getCountries(HELLO)
		}
			
		);

		console.log('ME', this.state.languageISO, 'want this one')

	}


	getLanguageValue = (e) => {
		console.log('muffin')
		// console.log(e.target.id)
		// console.log(e.nativeEvent.target.value)
		console.log(e.target.value)

		this.setState({
			languageISO: e.target.value,
		});

		// this.getCountries()
		console.log(this.state.languageISO)


	}


	getCountries = (lang) => {
		// CountryLanguage.getLanguage(this.state.language);
		// const countriesSpeakingX = this.state.language.countries;
		console.log(this.state.languageISO, "MUFFIN")

		console.log('getCountries')

		
		const test = CountryLanguage.getLanguage(lang, function (err, language) {
			if (err) {
				console.log(err);
			} else {
				return language.countries;
			}
		});

		console.log(test)
		// const countries = []

		this.setState({
			countriesData: test
		})

		console.log(this.state.countriesData, 'hi')

		// test.map(country => {
		// })

		// CountryLanguage.getLanguage(this.state.languageISO, function (err, language) {
		// 	// const lang = this.state.languageISO
		// 	var countriesSpeakingX
		// 	const countries = []

		// 	if (err) {
		// 		console.log(err);
		// 	} else {
		// 		// countriesSpeakingX = language.countries;
		// 		// console.log(language.countries)
		// 		countriesSpeakingX = language.countries
		// 		return countriesSpeakingX

		// 	// 	this.setState({
		// 	// 		countries: countriesSpeakingX
		// 	// 	})
		// 	}
		// 	console.log(countriesSpeakingX);



			// for (let i = 0; i < countriesSpeakingX.length; i++) {
			// 	console.log(countriesSpeakingX[i].name)
			// }
			
			// countriesSpeakingX.map(country => {
			// 	countries.push(country.name)
			// 	return countries
			// })

			// console.log(countries)
		// });

	}

	render() {
		// console.log(this.state.languageISO)
		// this.getCountries()

		return (
			<select name="chosenLanguage" id="chosenLanguage" 
			// value={this.state.value} 
			onChange={this.handleChange}>
					<option value="">Select a language</option>
				{
					allLanguages.map((language, i) => {
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
