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

  showSelect = () => {
    var element = document.getElementsByClassName("select-items-language");
    element[0].classList.toggle("select-hide");
    var otherElement = document.getElementsByClassName("select-items-wonder");
    otherElement[0].classList.add("select-hide");
  }

  closeSelect = () => {
    var element = document.getElementsByClassName("select-items-language");
    element[0].classList.add("select-hide");
  }

  render() {
		return (
      <div className="select-box select-language" tabIndex="0" onBlur={this.closeSelect}>
        <select
          id={this.props.id}
          name="chosenLanguage"
          placeholder="Search by Language"
          onChange={this.handleChange}
          disabled={this.props.isDisabled("langValue")}
        >
          <option value="" className="dropdown">
            Search by Language
          </option>
          {
            this.allLangsWithCountries().map(language => {
              return (
                <option value={language.iso639_3} key={language.iso639_3} className="languageOption">
                  {language.name}
                </option>
              )
            })
          }
        </select>
        <div className="select-selected" onClick={this.showSelect}>
          <p>Search by Language</p>
        </div>
        <div className="select-items select-items-language select-hide">
          {
            this.allLangsWithCountries().map(language => {
              return (
                <div id={language.iso639_3} key={language.iso639_3} className="languageOption">
                  {language.name}
                </div>
              )
            })
          }
        </div>
      </div>
			)
	}
}

export default Language;
