import React, { Component } from "react";
// import axios from "axios";
import "country-language";

const CountryLanguage = require('country-language');
var allLanguageCodes = CountryLanguage.getLanguageCodes(3);
var allLanguages = CountryLanguage.getLanguages();


// console.log(allLanguageCodes, 'hi')



class Language extends Component {
	constructor() {
		super();
		this.State = {
			Language: "",
			LanguageISO: "",
		}
	};


	componentDidMount(){
		
		// console.log(CountryLanguage.getLanguageCodes(3));
		// console.log(allLanguages)

		
		return( 'cake'
			);


			
	
	}




	render() {
		return (
			<select name="chosenLanguage" id="chosenLanguage">
				{
					allLanguages.map((language, i) => {
						// console.log(language.name);
						return(
							<option value={language.iso639_3}>{language.name}</option>
						)
					})
				}
				
			</select>
				
			)
	}
}

export default Language;
