import React, { Component } from "react";

class NotFound extends Component {
  render() {
    return (
      <div>
        <h2>404 Not Found</h2>
        <p>Sorry, our satelite systems might be too primitive compared to your technologies and thus an error occurred.</p>
        <p>Please click <a href="/">here</a> to return to the main page to attempt your search again.</p>
        <p>Thanks!</p>
      </div>
    )
  }
}

export default NotFound;
