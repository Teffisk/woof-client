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

    let convertedDate = new Date(this.props.review.createdAt);

    return (
      <div className="review-container">
        <h2>{this.props.review.title}</h2>
        <p>{convertedDate.toDateString()}</p>
        <h6>By: {this.props.review.user.username}</h6>
        <h6>Dog Friendliness Rating: {paws}</h6>
        <h6>{hashtags}</h6>
        <p>{this.props.review.description}</p>
        {/* <div>
          <h3>Div containing any images</h3>
        </div> */}
      </div>
    );
  }
}

export default Review;
