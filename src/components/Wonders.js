import React, { Component } from "react";
import wonders from "../data/wonders";

class WondersSearch extends Component {
  render() {
    return (
      <select
        id={this.props.id}
        name="chosenWonder"
        onChange={this.props.handleChange}
        disabled={this.props.isDisabled("wndrValue")}
      >
        <option value="">Search by wonder</option>
        {
          Object.entries(wonders).map(wonder => {
            return (
              <option key={wonder[0]} value={wonder[1]}>{wonder[1]}</option>
            )
          })
        }
			</select>
		)
	}
}

export default WondersSearch;
