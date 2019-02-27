import React, { Component } from "react";
import Maps from "./Maps";
import yelp from "yelp-fusion";
import SERVER_URL from "../constants/server";

class Places extends Component {
  constructor() {
    super();
    this.state = {
      lng: -122.3321,
      lat: 47.6352,
      zoom: 9.7,
      searchLocation: ""
    };
  }

  componentDidMount = () => {
    console.log("Places did mount");
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
        this.setState({
          searchLocation: json,
          lng: json.coordinates.longitude,
          lat: json.coordinates.latitude,
          zoom: 16
        });
      });
  };

  handleOnSubmit = e => {
    console.log("Hitting handleOnSubmit!");
    e.preventDefault();
    this.getSearchedLocation();
  };

  render() {
    return (
      <div className="map">
        <Maps
          fly={this.flyToLocation}
          lng={this.state.lng}
          lat={this.state.lat}
          zoom={this.state.zoom}
        />
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
      </div>
    );
  }
}

export default Places;
