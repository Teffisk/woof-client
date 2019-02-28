import React, { Component } from "react";
import LocationResult from "./LocationResult";
import Review from "./Review";
import LocationSearchForm from "./LocationSearchForm";

class LocationInfo extends Component {
  render() {
    return (
      <div>
        <LocationSearchForm
          handleOnSubmit={this.props.handleOnSubmit}
          searchLocation={this.props.searchLocation}
          grabLocation={this.props.grabLocation}
        />
        <LocationResult location={this.props.location} />
        <Review />
        <Review />
      </div>
    );
  }
}

export default LocationInfo;
