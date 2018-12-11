import React, { Component } from "react";
import swal from "@sweetalert/with-react";

class Popups extends Component {
  popup = e => {
    switch (e.target.getAttribute("data-type")) {
      case "about":
        swal(
          <div>
            <h2>The Intergalactic Visitors System welcomes you!</h2>
            <p>
              Welcome to Earth! Search for destination places on Earth by place, language, or by wonder (i.e. what Earthlings consider noteworthy). Login to save and view a list of your favourite destination places!
            </p>
            <p>(Remember to use your perception filter while visiting!)</p>
          </div>
        )
        break;
      case "list":
        swal(
          <div>
            <h2>Future Destinations List</h2>
            <ul>
              {
                this.props.placeEntries ?
                  Object.entries(this.props.placeEntries).map((entry) => {
                    return (
                      <li>
                        <a href={`../../${entry[1].name}/${entry[1].lat}/${entry[1].lng}`}>
                          <h3>{entry[1].name}</h3>
                          <p>Latitude: {entry[1].lat}</p>
                          <p>Longitude: {entry[1].lng}</p>
                        </a>
                      </li>
                    )
                  })
                  :
                  <p>You have no saved places</p>
              }
            </ul>
          </div>
        )
        break;
      default:
        console.log("THIS CODE SHOULD NOT BE RUN");
        break;
    }
  }

  drawButton = () => {
    return (
      <li>
        <button onClick={this.popup} data-type={this.props.type} className={`btn btn-${this.props.type}`} />
      </li>
    )
  }

  render() {
    if (this.props.type === "list" && this.props.user !== null) {
      return this.drawButton();
    } else if (this.props.type === "about") {
      return this.drawButton();
    } else {
      return null;
    }
  }
}

export default Popups;
