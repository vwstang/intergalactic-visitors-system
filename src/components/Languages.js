import React, { Component } from "react";
import "country-language";

const CountryLanguage = require('country-language');


class Language extends Component {
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
    const result = CountryLanguage.getLanguages().filter(lang => {
      return CountryLanguage.getLanguageCountries(lang.iso639_3).length > 0;
    });
    return result;
  }

  render() {
		return (
      <select
        id={this.props.id}
        name="chosenLanguage"
        placeholder="Search by Language"
        onChange={this.handleChange}
        disabled={this.props.isDisabled("langValue")}
      >
					<option value="">Search by language</option>
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
