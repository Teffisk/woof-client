import React, { Component } from "react";
import Maps from "./Maps";

class Home extends Component {
  render() {
    return (
      <div>
        <p>Map should load below:</p>
        <Maps />
      </div>
    );
  }
}

export default Home;
