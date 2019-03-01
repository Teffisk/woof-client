import React, { Component } from "react";
import SERVER_URL from "../constants/server";

const selectedTags = [];

class NewReviewForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: props.user.id,
      locationId: props.location.id,
      title: "",
      dogFriendliessRating: "",
      tags: [],
      description: ""
    };
  }

  handleSubmit = e => {
    console.log("Submitting new review form!!!!");
    e.preventDefault();
    this.props.handleShowReviewForm();
    this.postNewReview();
  };

  postNewReview = () => {
    console.log("Hitting postNewReview fetch call!!!!");
    fetch(SERVER_URL + "/reviews/new", {
      method: "POST",
      body: JSON.stringify(this.state), // data to send to server
      headers: {
        "Content-Type": "application/json" // let the server know what's coming
      }
    })
      .then(response => response.json())
      .then(json => {
        this.props.updateReviews(json);
        this.props.getReviews();
      })
      .catch(err => {
        console.log("Error posting data!", err);
      });
  };

  storeInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleTags = e => {
    selectedTags.push(e.target.value);
    this.setState({ tags: selectedTags });
  };

  removeTag = e => {
    e.preventDefault();
    console.log("selectedTags:", selectedTags);
    console.log(
      "Removing:",
      e.target.value,
      "Index is:",
      selectedTags.indexOf(e.target.value)
    );
    selectedTags.splice(selectedTags.indexOf(e.target.value), 1);
    this.setState({ tags: selectedTags });
  };

  render() {
    const tagsList = [
      "#waterbowl",
      "#onleash",
      "#offleash",
      "#lotsofdogs",
      "#dogfriendlystaff",
      "#treats",
      "#dogsinside",
      "#nodogsallowed",
      "#dogfriendlypatio"
    ];

    const tags = tagsList.map(t => {
      return <option value={t}>{t}</option>;
    });

    const showTags = selectedTags.map(t => {
      return (
        <div className="display-tag">
          {t}{" "}
          <button value={t} onClick={this.removeTag}>
            x
          </button>
        </div>
      );
    });

    return (
      <div>
        <form className="new-review-form" onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="title">Review Title</label>
            <input type="text" name="title" onChange={this.storeInput} />
          </div>
          <div>
            <label htmlFor="dogFriendliessRating">Dog Friendliness Score</label>
            <select
              type="number"
              name="dogFriendlinessRating"
              onChange={this.storeInput}
            >
              <option disabled="disabled" selected="selected">
                1-5
              </option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          <div>
            <label htmlFor="tags">Hashtags</label>
            <select type="text" name="tags" onChange={this.handleTags}>
              <option disabled="disabled" selected="selected">
                Choose all that apply
              </option>
              {tags}
            </select>
          </div>
          <div className="tags-container">{showTags}</div>
          <div>
            <label htmlFor="description">Review</label>
            <div>
              <textarea
                className="review-body"
                name="description"
                onChange={this.storeInput}
              />
            </div>
            <div>
              <input type="submit" value="Submit" />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default NewReviewForm;
