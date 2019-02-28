import React, { Component } from "react";

class Review extends Component {
  render() {
    return (
      <div className="review-container">
        <h2>Review Title</h2>
        <h5>By: Link to user's Profile</h5>
        <h3>Overall Rating</h3>
        <h3>Dog Friendliness Rating</h3>
        <h5>Horizontal list of #tags</h5>
        <p>Description of user's review</p>
        <div>
          <h3>Div containing any images</h3>
        </div>
      </div>
    );
  }
}

export default Review;
