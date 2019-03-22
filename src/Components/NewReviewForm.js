import React, { Component } from "react";
import SERVER_URL from "../constants/server";
import { Row, Input, Button } from "react-materialize";

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
          {t}
          <Button
            value={t}
            onClick={this.removeTag}
            className="delete-tag"
            waves="light"
          >
            x
          </Button>
        </div>
      );
    });

    return (
      <div>
        <form className="new-review-form" onSubmit={this.handleSubmit}>
          <div className="review-header">Write A New Review</div>
          <Row>
            <label htmlFor="title">Review Title</label>
            <Input
              s={12}
              className="new-review-title"
              type="text"
              name="title"
              onChange={this.storeInput}
            />
          </Row>
          <Row>
            <Input
              s={12}
              type="select"
              label="Dog Friendliness Score"
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
            </Input>
          </Row>
          <Row>
            <Input
              s={12}
              name="tags"
              type="select"
              label="Hashtags"
              onChange={this.handleTags}
            >
              <option disabled="disabled" selected="selected">
                Choose all that apply
              </option>
              {tags}
            </Input>
          </Row>
          <div className="tags-container container">{showTags}</div>
          <div>
            <label htmlFor="description">Review</label>
            <Row>
              <Input
                s={12}
                type="textarea"
                className="review-body"
                name="description"
                onChange={this.storeInput}
              />
            </Row>
            <div>
              <input
                className="new-review-submit"
                type="submit"
                value="Submit"
              />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default NewReviewForm;
