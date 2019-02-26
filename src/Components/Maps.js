import React, { Component } from "react";
import mapboxgl from "mapbox-gl";
import ReactMapboxGl from "react-mapbox-gl";

mapboxgl.accessToken =
  "pk.eyJ1IjoidGVmZmlzayIsImEiOiJjanFta3hiZ2EwYmx1M3dubzdwenJzcHM5In0.2OK5yrhkJMVUtceL4O7y5g";

class Maps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: this.props.lng,
      lat: this.props.lat,
      zoom: this.props.zoom
    };
  }

  componentDidMount = () => {
    const { lng, lat, zoom } = this.state;

    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: "mapbox://styles/mapbox/streets-v9",
      center: [lng, lat],
      zoom
    });

    map.on("move", () => {
      const { lng, lat } = map.getCenter();
      // Change the cursor to a pointer when the mouse is over the places layer.
      map.on("mouseenter", "points", function() {
        map.getCanvas().style.cursor = "pointer";
      });
      // Change it back to a pointer when it leaves.
      map.on("mouseleave", "points", function() {
        map.getCanvas().style.cursor = "";
      });
      this.setState({
        lng: lng.toFixed(4),
        lat: lat.toFixed(4),
        zoom: map.getZoom().toFixed(2)
      });
    });
  };

  componentDidUpdate = () => {};

  render() {
    return (
      <div>
        <div
          ref={el => (this.mapContainer = el)}
          className="absolute top right left bottom"
        />
      </div>
    );
  }
}

export default Maps;
