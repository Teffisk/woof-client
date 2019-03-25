import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Nav extends Component {
  handleLogout = e => {
    e.preventDefault();
    // REMOVE LS TOKEN; UPDATE PARENT STATE
    localStorage.removeItem("mernToken");
    this.props.updateUser();
  };

  render() {
    let links = "";
    console.log("USER AT NAV:", this.props.user);
    if (this.props.user) {
      links = (
        <span>
          {/* <Link to="/">Home</Link> */}
          <Link to="/places">Find Places</Link>
          <Link to="/profile">Profile</Link>
          <a onClick={this.handleLogout}>Logout</a>
          <span className="nav-name">{this.props.user.username}</span>
        </span>
      );
    } else {
      links = (
        <span>
          {/* <Link to="/">Home</Link> */}
          <Link to="/places">Find Places</Link>
          <Link to="/login">Log in</Link>
          <Link to="/signup">Sign up</Link>
        </span>
      );
    }
    return <nav className="nav">{links}</nav>;
  }
}

export default Nav;
