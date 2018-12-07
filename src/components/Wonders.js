import React, { Component } from "react";
import wonders from "../data/wonders";

class WondersSearch extends Component {
  handleChange = e => {
    const value = e.target.value;
    const name = value.slice(0, value.indexOf("@"));
    const lat = value.slice(value.indexOf("@") + 1, value.indexOf("?"));
    const lng = value.slice(value.indexOf("?") + 1);
    this.props.updateWndrValue(name, lat, lng)
  }

  render() {
    return (
      <select
        id="chosenWonder"
        name="chosenWonder"
        onChange={this.handleChange}
        disabled={this.props.isDisabled("wndrValue")}
      >
        <option value="">Search by wonder</option>
        {
          Object.values(wonders).map(wonder => {
            return (
              <option value={`${wonder.name}@${wonder.lat}?${wonder.lng}`}>{wonder.name}</option>
            )
          })
        }
			</select>
		)
	}
}

export default WondersSearch;
