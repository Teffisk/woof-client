import React, { Component } from "react";
import { Link } from "react-router-dom";

class Nav extends Component {
  handleLogout = e => {
    e.preventDefault();
    // REMOVE LS TOKEN; UPDATE PARENT STATE
    localStorage.removeItem("serverToken");
    this.props.updateUser();
  };

  render() {
    let links = "";
    if (this.props.user) {
      links = (
        <span>
          <Link to="/people">People</Link>
          <Link to="/dogs">Dogs</Link>
          <Link to="/places">Places</Link>
          <Link to="/profile">Profile</Link>
          <a onClick={this.handleLogout}>Logout</a>
        </span>
      );
    } else {
      links = (
        <span>
          <Link to="/login">Log in</Link>
          <Link to="/signup">Sign up</Link>
        </span>
      );
    }
    return (
      <div className="anotherWholeGrid">
        <div className="navBackground" />
        <nav className="nav">
          <Link to="/">Home</Link>
          {links}
        </nav>
      </div>
    );
  }
}

export default Nav;
