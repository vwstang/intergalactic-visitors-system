import React, { Component } from "react";
import wonders from "../data/wonders";

class WondersSearch extends Component {

  showSelect = () => {
    var element = document.getElementsByClassName("select-items-wonder");
    element[0].classList.toggle("select-hide");
    var otherElement = document.getElementsByClassName("select-items-language");
    otherElement[0].classList.add("select-hide");
  }

  closeSelect = () => {
    var element = document.getElementsByClassName("select-items-wonder");
    element[0].classList.add("select-hide");
  }

  render() {
    return (
      <div className="select-box select-wonder" tabIndex="0" onBlur={this.closeSelect}>
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
        <div className="select-selected" onClick={this.showSelect}>
          <p>Search by Wonder</p>
        </div>
        <div className="select-items select-items-wonder select-hide">
          {
            Object.entries(wonders).map(wonder => {
              return (
                <div id={wonder[1]} key={wonder[0]} className="wonderOption">
                  {wonder[1]}
                </div>
              )
            })
          }
        </div>
      </div>
		)
	}
}

export default WondersSearch;
