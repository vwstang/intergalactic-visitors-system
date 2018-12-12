import React, { Component } from "react";
import firebase from "../data/firebase";

const provider = new firebase.auth.GoogleAuthProvider();
const auth = firebase.auth();

class Authentication extends Component {

  login = () => {
    auth.signInWithPopup(provider)
      .then((result) => {
        const user = result.user;
        this.props.updateUser(user);
      });
  }

  logout = () => {
    auth.signOut()
      .then(() => this.props.updateUser(null));
  }

  render() {
    return (
      <li>
        {
          this.props.user ?
            <button
              tabIndex="0"
              onClick={this.logout}
              className="btn btn-user"
              style={{ backgroundImage: `url(${this.props.user.photoURL})`, backgroundSize: "cover", backgroundPosition: "center center", backgroundRepeat: "no-repeat", borderRadius: "50%" }} /> :
            <button
              tabIndex="0"
              onClick={this.login}
              className="btn btn-alien"
              style={{ backgroundSize: "cover", backgroundPosition: "center center", backgroundRepeat: "no-repeat", borderRadius: "50%" }}
            >
            </button>
        }
      </li>
    )
  }

}

export default Authentication;
