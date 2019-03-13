import React, { Component } from "react";
import paw from "../img/paw.png";
import pawHalf from "../img/paw-half.png";

class LocationResult extends Component {
  render() {
    const getCategories = () => {
      if (!this.props.location.categories) {
        return null;
      }
      const types = this.props.location.categories.map(d => (
        <li className="location-type">{d.title} </li>
      ));
      return <ul className="location-types">{types}</ul>;
    };

    let totalCount = 0;

    const meanFunction = rating => {
      return (totalCount += rating.dogFriendlinessRating);
    };
    const getAverageScore = () => {
      const numOfReviews = this.props.reviews.length;

      this.props.reviews.forEach(meanFunction);
      return totalCount / numOfReviews;
    };

    const ratings = this.props.reviews ? getAverageScore() : 0;

    const listOfPaws = [];

    let i = 1;
    while (i <= ratings) {
      listOfPaws.push(1);
      i++;
    }
    if (ratings % 1 != 0) {
      listOfPaws.push(0.5);
    }

    const paws = listOfPaws.map(p => {
      if (p == 1) {
        return <img src={paw} />;
      } else {
        return <img src={pawHalf} />;
      }
    });

    return (
      <div className="location-result-container">
        <h1 className="location-title">{this.props.location.name}</h1>

        <div className="location-result-text">
          {getCategories()}
          <h4>
            Yelp Rating: {this.props.location.rating} (
            {this.props.location.review_count})
          </h4>
          <h4>Average Dog Friendliness: {paws}</h4>
          <h4>#dogfriendly #onleash #waterbowl</h4>
          <p>
            <br />
            {this.props.location.display_phone}
          </p>
        </div>
        <div className="location-img-container">
          <img className="location-img" src={this.props.location.image_url} />
        </div>
        <button
          className="add-review-button"
          onClick={this.props.handleShowReviewForm}
        >
          Add a Review
        </button>
      </div>
    );
  }
}

export default LocationResult;
