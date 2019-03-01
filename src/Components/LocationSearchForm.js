import React, { Component } from "react";
import SERVER_URL from "../constants/server";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchLocation: props.searchLocation
    };
  }

  handleOnSubmit = e => {
    console.log("Hitting handleOnSubmit!");
    e.preventDefault();
    this.getSearchedLocation();
  };

  onChangeLocation = e => {
    this.setState({ searchLocation: e.target.value });
    console.log("Places state:", this.state.searchLocation);
  };

  getSearchedLocation = () => {
    console.log("Hitting getSearchedLocation fetch call");
    fetch(SERVER_URL + "/places/search/" + this.state.searchLocation)
      .then(response => {
        return response.json();
      })
      .then(json => {
        this.props.updateLocation(json);
        this.props.getReviews();
      });
  };

  render() {
    return (
      <div className="location-form-container">
        <form
          className="location-form  z-depth-5"
          onSubmit={this.handleOnSubmit}
        >
          <label htmlFor="searchLocation">Location</label>
          <input
            type="text"
            name="searchLocation"
            onChange={this.onChangeLocation}
          />
          <input type="submit" value="search" />
        </form>
      </div>
    );
  }
}

export default Home;
