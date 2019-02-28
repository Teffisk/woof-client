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
    selectedTags.pop(selectedTags.indexOf(e.target.value));
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
      "#nodogsallowed"
    ];

    const tags = tagsList.map(t => {
      return <option value={t}>{t}</option>;
    });

    const showTags = selectedTags.map(t => {
      return (
        <div className="display-tag">
          {t} <button onClick={this.removeTag}>x</button>
        </div>
      );
    });

    return (
      <div>
        <form className="new-review-form">
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
              <option disabled="disabled" type="default">
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
              {tags}
            </select>
          </div>
          <div className="tags-container">{showTags}</div>
          <div>
            <label htmlFor="description">Review</label>
            <textarea name="description" onChange={this.storeInput} />
          </div>
        </form>
      </div>
    );
  }
}

export default NewReviewForm;
