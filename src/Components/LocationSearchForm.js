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
    this.props.updateReviews([]);
  };

  onChangeLocation = e => {
    this.setState({ searchLocation: e.target.value });
    console.log("Places state:", this.state.searchLocation);
  };

  getSearchedLocation = () => {
    console.log("Hitting getSearchedLocation fetch call");
    fetch(SERVER_URL + "/places/search/" + this.state.searchLocation)
      .then(response => {
        if (response) {
          return response.json();
        }
      })
      .then(json => {
        this.props.updateLocation(json);
        this.props.getReviews();
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <div className="location-form-container">
        <form className="location-form" onSubmit={this.handleOnSubmit}>
          <label htmlFor="searchLocation">Search for a local spot</label>
          <input
            placeholder="Type the name of a location to see its dog friendliness rating"
            className="search-textbox"
            type="text"
            name="searchLocation"
            onChange={this.onChangeLocation}
          />
          <input className="search-button" type="submit" value="search" />
        </form>
      </div>
    );
  }
}

export default Home;
