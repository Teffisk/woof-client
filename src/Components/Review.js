import React, { Component } from "react";
import paw from "../img/paw.png";

class Review extends Component {
  render() {
    const hashtags = this.props.review.tags.map(t => {
      <span>{t}</span>;
    });

    const listOfPaws = [];

    const numOfPaws = this.props.review.dogFriendlinessRating;
    let i = 1;
    while (i <= numOfPaws) {
      listOfPaws.push(i);
      i++;
    }

    const paws = listOfPaws.map(p => {
      return <img src={paw} key={p} />;
    });

    return (
      <div className="review-container">
        <h2>Review Title for {this.props.location.name}</h2>
        <h5>By: {this.props.review.user.username}</h5>
        <h3>Dog Friendliness Rating: {paws}</h3>
        <h5>{hashtags}</h5>
        <p>{this.props.review.description}</p>
        {/* <div>
          <h3>Div containing any images</h3>
        </div> */}
      </div>
    );
  }
}

export default Review;
