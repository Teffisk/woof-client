import React, { Component } from "react";
import Maps from "./Maps";
import LocationInfo from "./LocationInfo";

class Places extends Component {
  constructor() {
    super();
    this.state = {
      lng: -122.3321,
      lat: 47.6352,
      zoom: 9.7,
      location: {}
    };
  }

  updateLocation = input => {
    this.setState({ location: input });
  };

  handleZoom = zoom => {
    this.setState({
      zoom: zoom
    });
  };

  render() {
    return (
      <div className="dash-view">
        <div id="desktop" className="info-container">
          <LocationInfo
            location={this.state.location}
            handleOnSubmit={this.handleOnSubmit}
            searchLocation={this.state.searchLocation}
            updateLocation={this.updateLocation}
            user={this.props.user}
          />
        </div>
        <div className="map-container">
          <Maps
            lat={this.state.lat}
            lng={this.state.lng}
            zoom={this.state.zoom}
            location={this.state.location}
            handleZoom={this.handleZoom}
          />
        </div>
        <div id="mobile" className="info-container">
          <LocationInfo
            location={this.state.location}
            handleOnSubmit={this.handleOnSubmit}
            searchLocation={this.state.searchLocation}
            updateLocation={this.updateLocation}
            user={this.props.user}
          />
        </div>
      </div>
    );
  }
}

export default Places;
