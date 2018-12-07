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
          wonders.map(wonder => {
            return (
              <option value={wonder}>{wonder}</option>
            )
          })
        }
			</select>
		)
	}
}

export default WondersSearch;
