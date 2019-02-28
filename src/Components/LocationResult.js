import React, { Component } from "react";

class LocationResult extends Component {
  render() {
    const getCategories = () => {
      if (!this.props.location.categories) {
        return null;
      }
      const types = this.props.location.categories.map(d => <li>{d.title}</li>);
      return <ul className="">{types}</ul>;
    };

    return (
      <div className="location-result-container">
        <h1>{this.props.location.name}</h1>
        {getCategories()}
        <h4>Yelp Rating: {this.props.location.rating}</h4>
        <h4>Dog Friendliness Rating: *****</h4>
        <h4>#dogfriendly #onleash #waterbowl</h4>
        <p>
          <br />
          {this.props.location.display_phone}
        </p>
        <button onClick={this.props.handleShowReviewForm}>Add a Review</button>
      </div>
    );
  }
}

export default LocationResult;
