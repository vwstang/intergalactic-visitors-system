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

	allLanguageCodesWithCountries = () => {


		const test = CountryLanguage.getLanguages().filter((lang) => {

			const test2 = CountryLanguage.getLanguage(lang, function (err, language) {
				
				if (err) {
					console.log(err);
				} else {
					// return language.countries; 
					return language.countries.map(country => {
						return country.name
					});
					
				}
			}).length > 0; // method call

		}) 

		console.log(test)
	}



	handleChange = (event) => {
    const selectionValue = event.target.value;
    let resultValue;

    if (selectionValue === "") {
      resultValue = "";
    } else {
      const countries = this.getCountries(selectionValue);
      resultValue = this.randomCountry(countries);
    }

    this.props.updateLangValue(resultValue);
	}

  getCountries = (lang) => {
		return CountryLanguage.getLanguage(lang, (err, language) => {
			if (err) {
				console.log(err);
      } else {
				return language.countries.map(country => {
					return country.name
				});
			}
		});
	}

	randomCountry = (list) => list[Math.floor(Math.random() * list.length)];

  // This uses the country-language module to get all languages in the world into an array and filter the array for any languages that have no countries that speak the language.
  allLangsWithCountries = () => {
    // console.log(CountryLanguage.getLanguages());
    const result = CountryLanguage.getLanguages().filter(lang => {
      return CountryLanguage.getLanguageCountries(lang.iso639_3).length > 0;
    });
    // console.log(result);
    return result;
  }

  render() {
		return (
      <select
        name="chosenLanguage"
        id="chosenLanguage" 
        onChange={this.handleChange}
        disabled={this.props.isDisabled("langValue")}
      >
					<option value="">Select a language</option>
				{
					this.allLangsWithCountries().map(language => {
						return (
							<option value={language.iso639_3} key={language.iso639_3} className="languageOption">{language.name}</option>
						)
					})
				}

			</select>

			)
	}
}

export default Language;
