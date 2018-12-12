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

  selectItem = (event) => {
    this.closeSelect();
    let wonder = event.target.id;
    let options = document.getElementsByClassName("select-wond")[0].options;
    for (let i = 0; i < options.length; i++) {
      if (wonder === options[i].value) {
        document.getElementsByClassName("select-wond")[0].selectedIndex = i;
      }
    }
    this.props.handleChange(wonder);
    document.getElementsByClassName("chosen-wond")[0].innerHTML = event.target.innerHTML;
  }

  render() {
    return (
      <div className={this.props.isDisabled("wndrValue") ? "select-box select-wonder invisible" : "select-box select-wonder"} tabIndex="0" onBlur={this.closeSelect}>
        <select
          className="select-wond"
          id={this.props.id}
          name="chosenWonder"
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
          <p className="chosen-wond">Search by Wonder</p>
        </div>
        <div className="select-items select-items-wonder select-hide">
          {
            Object.entries(wonders).map(wonder => {
              return (
                <div id={wonder[1]} key={wonder[0]} className="wonderOption" onClick={this.selectItem}>
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
