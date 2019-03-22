import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from "axios";
import SERVER_URL from "./constants/server";
import "./App.css";
import Footer from "./layout/Footer";
import Nav from "./layout/Nav";
import Home from "./Components/Home";
import People from "./Components/People";
import Dogs from "./Components/Dogs";
import Places from "./Components/Places";
import Profile from "./Components/Profile";
import Login from "./auth/Login";
import Signup from "./auth/Signup";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
  }

  componentDidMount = () => {
    console.log("component did mount!");
    this.getUser();
  };

  getUser = () => {
    var token = localStorage.getItem("mernToken");
    if (token) {
      console.log("token found in LS", token);
      // There is a token in localStorage. Try to validate it!
      axios
        .get(SERVER_URL + "/auth/current/user", {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => {
          console.log("SUCCESS", response);

          this.setState({
            user: response.data.user
          });
          console.log("USER:", this.state.user);
        })
        .catch(err => {
          console.log("ERROR", err);
          console.log("Error Log err.response:", err.response);
          localStorage.removeItem("mernToken");
          this.setState({
            user: null
          });
        });
    } else {
      console.log("No token was found");
      // localStorage.removeItem('mernToken');
      this.setState({
        user: null
      });
    }
  };

  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <header className="App-header">
              <Nav user={this.state.user} updateUser={this.getUser} />
            </header>
            <div className="content">
              <Route
                exact
                path="/"
                component={() => <Home user={this.state.user} />}
              />
              <Route
                path="/places"
                component={() => (
                  <Places user={this.state.user} getUser={this.getUser} />
                )}
              />
              <Route
                path="/profile"
                component={() => <Profile user={this.state.user} />}
              />
              <Route
                path="/login"
                component={() => (
                  <Login user={this.state.user} updateUser={this.getUser} />
                )}
              />
              <Route
                path="/signup"
                component={() => (
                  <Signup user={this.state.user} updateUser={this.getUser} />
                )}
              />
            </div>
          </div>
        </Router>
        <Footer />
      </div>
    );
  }
}

export default App;
