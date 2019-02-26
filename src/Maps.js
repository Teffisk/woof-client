import React, { Component } from "react";
import ReactMap from "react-mapbox-gl";

const accessToken =
  "pk.eyJ1IjoidGVmZmlzayIsImEiOiJjanFta3hiZ2EwYmx1M3dubzdwenJzcHM5In0.2OK5yrhkJMVUtceL4O7y5g";
const style = "mapbox://styles/mapbox/streets-v9";

const Map = ReactMap({
  accessToken
});

const mapStyle = {
  height: "100vh",
  width: "100vw"
};
class Maps extends Component {
  render() {
    return <Map style={style} containerStyle={mapStyle} />;
  }
}

export default Maps;
