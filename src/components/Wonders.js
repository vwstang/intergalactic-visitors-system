import React, { Component } from "react";
import wonders from "../data/wonders";

class WondersSearch extends Component {
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
              <option
                value={`${wonder.name}@${wonder.lat}?${wonder.lng}`}
              >
                {wonder.name}
              </option>
            )
          })
        }
			</select>
		)
	}
}

export default WondersSearch;
