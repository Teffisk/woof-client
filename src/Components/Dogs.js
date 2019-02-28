import React, { Component } from "react";
import SERVER_URL from "../constants/server";
import AddDogForm from "./AddDogForm";
import DogList from "./DogList";

class Dogs extends Component {
  constructor() {
    super();
    this.state = {
      dogs: [],
      showForm: false
    };
  }

  componentDidMount = () => {
    this.getDogs();
  };

  getDogs = () => {
    console.log("Hitting getDogs fetch call");
    if (this.props.user) {
      fetch(SERVER_URL + "/dogs/" + this.props.user.id, {
        method: "GET",
        headers: {
          "Content-Type": "application/json" // let the server know what's coming
        }
      })
        .then(response => response.json())
        .then(json => {
          console.log(json);
          this.setState({ dogs: json });
        })
        .catch(err => {
          console.log("Error posting data!", err);
        });
    }
  };

  handleFormState = () => {
    let newFormState = !this.state.showForm;
    console.log("NewFormState:", newFormState);
    this.setState({ showForm: newFormState });
  };

  render() {
    if (this.props.user) {
      const ShowDogs = this.state.showForm ? (
        <AddDogForm
          user={this.props.user}
          dogs={this.state.dogs}
          showForm={this.state.showForm}
          handleFormState={this.handleFormState}
        />
      ) : (
        <DogList user={this.props.user} dogs={this.state.dogs} />
      );

      return (
        <div>
          {ShowDogs}
          <button onClick={this.handleFormState} className="showAddDogForm">
            Add A Dog!
          </button>
        </div>
      );
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
