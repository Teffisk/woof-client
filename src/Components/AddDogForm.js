import React, { Component } from "react";
import SERVER_URL from "../constants/server";

class AddDogForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      breed: "",
      gender: "",
      birthday: "",
      userId: props.user.id,
      bio: ""
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    this.createNewDog();
  };

  storeInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  createNewDog = () => {
    console.log("Hitting createNewDog fetch call");
    fetch(SERVER_URL + "/dogs/new", {
      method: "POST",
      body: JSON.stringify(this.state), // data to send to server
      headers: {
        "Content-Type": "application/json" // let the server know what's coming
      }
    })
      .then(response => response.json())
      .then(json => {
        console.log(json);
        this.setState({ dog: json });
      })
      .catch(err => {
        console.log("Error posting data!", err);
      });
  };

  render() {
    return (
      <div>
        <p>Enter Your Dog's Detail Below:</p>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="name">Name</label>
            <input type="text" name="name" onChange={this.storeInput} />
          </div>
          <div>
            <label htmlFor="birthday">Birthday</label>
            <input type="date" name="birthday" onChange={this.storeInput} />
          </div>
          <input
            type="hidden"
            value={this.props.user.id}
            name="userId"
            onChange={this.storeInput}
          />
          <div>
            <label htmlFor="breed">breed</label>
            <input type="text" name="breed" onChange={this.storeInput} />
          </div>
          <div>
            <label htmlFor="gender">Gender</label>
            <select name="gender" onChange={this.storeInput}>
              <option disabled="disabled" selected="true">
                Choose
              </option>
              <option value="male">M</option>
              <option value="female">F</option>
            </select>
          </div>
          <div>
            <label htmlFor="bio">Tell people about your pup!</label>
            <textarea name="bio" onChange={this.storeInput} />
          </div>
          <div>
            <input type="submit" />
          </div>
        </form>
      </div>
    );
  }
}

export default AddDogForm;
