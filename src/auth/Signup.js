import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import SERVER_URL from "../constants/server";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: ""
    };
  }

  handleNameChange = e => {
    this.setState({ username: e.target.value });
  };

  handleEmailChange = e => {
    this.setState({ email: e.target.value });
  };

  handlePasswordChange = e => {
    this.setState({ password: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state);
    axios
      .post(SERVER_URL + "/auth/signup", this.state)
      .then(result => {
        console.log("SUCCESS!", result);
        // Add the newly received token to LS
        localStorage.setItem("mernToken", result.data.token);
        // Update the user with a call to App.js
        this.props.getUser();
      })
      .catch(err => {
        console.log("ERROR", err);
      });
  };

  render() {
    if (this.props.user) {
      return <Redirect to="/profile" />;
    }
    return (
      <div className="container">
        <h2>Signup as a new user</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <input
              name="Username"
              placeholder="What is your name?"
              value={this.state.username}
              onChange={this.handleNameChange}
            />
          </div>
          <div>
            <input
              name="Email"
              placeholder="What is your email?"
              value={this.state.email}
              onChange={this.handleEmailChange}
            />
          </div>
          <div>
            <input
              name="Password"
              type="password"
              value={this.state.password}
              onChange={this.handlePasswordChange}
            />
          </div>
          <input type="submit" value="Sign Me Up!" className="button" />
        </form>
      </div>
    );
  }
}

export default Signup;
