import React, { Component } from "react";

class Search extends Component {
  render() {
    return (
      <main>
        <h2>Hello!!</h2>
        <p>Mapquest is so grown up wow</p>
        <form action="">
          <label
            htmlFor="userContinent">What continent would you like to visit on Earth?</label>
          <input
            id="userContinent"
            type="text" />
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
        </form>
      </main>
    )
  }
}

export default Search;
