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

  componentDidMount = () => {
    this.setState({ reviews: [] });
    if (this.props.location.name) {
      this.getReviews();
    }
  };

  updateReviews = input => {
    console.log("updateReviews triggered!!!!", input);
    this.setState({ reviews: input.reviews });
  };

  getReviews = () => {
    console.log("getReviews fetch triggered!!!!", this.props.location.id);
    fetch(SERVER_URL + "/reviews/locations/" + this.props.location.id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json" // let the server know what's coming
      }
    })
      .then(response => response.json())
      .then(json => {
        console.log("Review state being updated!", json);
        this.updateReviews(json);
      })
      .catch(err => {
        console.log("Error in the getReviews call!!!", err);
      });
  };

  handleShowReviewForm = () => {
    this.setState({ showReviews: !this.state.showReviews });
  };

  render() {
    const reviews = this.state.reviews
      ? this.state.reviews.map(r => {
          return <Review review={r} location={this.props.location} />;
        })
      : [];

    const showReviews = this.state.showReviews ? (
      reviews
    ) : (
      <NewReviewForm
        location={this.props.location}
        user={this.props.user}
        updateReviews={this.updateReviews}
        handleShowReviewForm={this.handleShowReviewForm}
        getReviews={this.getReviews}
      />
    );

    const showLocation = this.props.location.name ? (
      <LocationResult
        location={this.props.location}
        user={this.props.user}
        handleShowReviewForm={this.handleShowReviewForm}
      />
    ) : (
      <span>Search a location</span>
    );

    return (
      <div>
        <LocationSearchForm
          handleOnSubmit={this.props.handleOnSubmit}
          searchLocation={this.props.searchLocation}
          updateLocation={this.props.updateLocation}
          user={this.props.user}
          handleShowReviewForm={this.handleShowReviewForm}
          getReviews={this.getReviews}
          updateReviews={this.updateReviews}
        />
        {showLocation}
        {showReviews}
      </div>
    );
  }
}

export default LocationInfo;
