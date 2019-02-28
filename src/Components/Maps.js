import React, { Component } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken =
  "pk.eyJ1IjoidGVmZmlzayIsImEiOiJjanFta3hiZ2EwYmx1M3dubzdwenJzcHM5In0.2OK5yrhkJMVUtceL4O7y5g";

var myMap;

class Maps extends Component {
  constructor() {
    super();
    this.state = {
      screenWidth: window.innerWidth,
      newLocation: []
    };
  }

  handleResize = () => {
    this.setState({
      screenWidth: window.innerWidth
    });
  };

  componentDidMount() {
    this.handleResize();
    window.addEventListener("resize", this.handleResize);
    myMap = new mapboxgl.Map({
      container: this.mapContainer,
      style: "mapbox://styles/mapbox/streets-v9",
      center: [this.props.lng, this.props.lat],
      zoom: this.props.zoom
    });
    // setTimeout(function() {
    //   myMap.flyTo({
    //     center: [
    //       -74.5 + (Math.random() - 0.5) * 10,
    //       40 + (Math.random() - 0.5) * 10
    //     ]
    //   });
    // }, 1000);
    myMap.resize();
  }

  componentDidUpdate = () => {
    if (this.props.location.coordinates) {
      myMap.flyTo({
        center: [
          this.props.location.coordinates.longitude,
          this.props.location.coordinates.latitude
        ],
        zoom: 15
      });
    }
  };

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
    myMap.remove();
  }

  render() {
    const style = {
      position: "relative",
      bottom: 0,
      width: "100%",
      height: this.state.screenWidth > 900 ? "100vh" : "40vh"
    };

    return (
      <div>
        <div style={style} ref={el => (this.mapContainer = el)} />;
      </div>
    );
  }
}

export default Maps;
