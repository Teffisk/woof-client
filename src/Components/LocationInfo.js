import React, { Component } from "react";
import LocationResult from "./LocationResult";
import Review from "./Review";
import LocationSearchForm from "./LocationSearchForm";
import SERVER_URL from "../constants/server";
import NewReviewForm from "./NewReviewForm";

class LocationInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      location: props.location,
      showReviews: true
    };
  }

  getReviews = () => {
    fetch(SERVER_URL + "/reviews/locations/" + this.props.location.id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json" // let the server know what's coming
      }
    })
      .then(response => response.json())
      .then(json => {
        console.log(json);
        this.setState({ reviews: json });
      })
      .catch(err => {
        console.log("Error in the getReviews call!!!", err);
      });
  };

  handleShowReviewForm = () => {
    this.setState({ showReviews: !this.state.showReviews });
  };

  render() {
    const reviews = this.state.reviews.map(r => {
      return <Review review={r} location={this.state.location} />;
    });

    const showReviews = this.state.showReviews ? (
      reviews
    ) : (
      <NewReviewForm location={this.state.location} user={this.props.user} />
    );

    return (
      <div>
        <LocationSearchForm
          handleOnSubmit={this.props.handleOnSubmit}
          searchLocation={this.props.searchLocation}
          grabLocation={this.props.grabLocation}
          user={this.props.user}
        />
        <LocationResult
          location={this.props.location}
          user={this.props.user}
          handleShowReviewForm={this.handleShowReviewForm}
        />
        {showReviews}
      </div>
    );
  }
}

export default LocationInfo;
