import React, { Component } from "react";
import SERVER_URL from "../constants/server";
import AddDogForm from "./AddDogForm";
import DogList from "./DogList";

class Dogs extends Component {
  constructor() {
    super();
    this.state = {
      dogs: []
    };
  }

  getDogs = () => {
    console.log("Hitting getDogs fetch call");
    fetch(SERVER_URL + "/dogs/" + this.state.dogs)
      .then(response => {
        return response.json();
      })
      .then(json => {
        this.setState({
          dogs: json
        });
      });
  };

  render() {
    const ShowDogs = this.state.dogs.length ? (
      <DogList user={this.props.user} dogs={this.state.dogs} />
    ) : (
      <AddDogForm user={this.props.user} dogs={this.state.dogs} />
    );
    if (this.props.user) {
      return <div>{ShowDogs}</div>;
    } else {
      return (
        <div>
          <p>This is a profile page. You must be logged in to see it.</p>
          <p>
            Would you like to <a href="/login">Log In</a> or{" "}
            <a href="/signup">Sign up</a>?
          </p>
        </div>
      );
    }
  }
}

export default Dogs;
