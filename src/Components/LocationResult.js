import React, { Component } from "react";
import paw from "../img/paw.png";
import pawHalf from "../img/paw-half.png";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

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
    if (ratings % 1 !== 0 && ratings !== 0) {
      listOfPaws.push(0.5);
    }

    const paws = listOfPaws.map(p => {
      if (p == 1) {
        return <img src={paw} />;
      } else if (p === 0.5) {
        return <img src={pawHalf} />;
      }
    });

    const dogRating =
      paws == 0 ? (
        <h4 className="dog-rating">Dog Friendliness: No reviews yet</h4>
      ) : (
        <h4 className="dog-rating">Dog Friendliness: {paws}</h4>
      );
    const flatten = arr => {
      var flat = [];
      for (var i = 0; i < arr.length; i++) {
        flat = flat.concat(arr[i]);
      }
      return flat;
    };
    const reviews = this.props.reviews;
    let allTags = [];
    let uniqueTags = [];
    if (reviews && reviews.length) {
      console.log("reviews", reviews);
      allTags = reviews.map(r => {
        return r.tags;
      });
      uniqueTags = flatten(allTags);
      console.log("uniqueTags", uniqueTags);
      uniqueTags = uniqueTags.filter(function(item, pos) {
        return uniqueTags.indexOf(item) == pos;
      });
      console.log("uniqueTags", uniqueTags);
    }
    const showTags = uniqueTags.map(t => {
      return <div>{t}</div>;
    });
    const locationButton = this.props.user ? (
      <button
        className="add-review-button"
        onClick={this.props.handleShowReviewForm}
      >
        Add a Review
      </button>
    ) : (
      <div>
        <Link to="/login" className="review-login-button">
          Log in to write a review
        </Link>
      </div>
    );

    return (
      <div className="location-result-container">
        <h1 className="location-title">{this.props.location.name}</h1>
        <h6>{this.props.location.display_phone}</h6>
        <div className="location-result-text">
          {getCategories()}
          <h4>
            Yelp Rating: {this.props.location.rating} (
            {this.props.location.review_count})
          </h4>
          {dogRating}
          <div>{showTags}</div>
        </div>
        <div className="location-img-container">
          <img className="location-img" src={this.props.location.image_url} />
        </div>
        {locationButton}
      </div>
    );
  }
}

export default LocationResult;
