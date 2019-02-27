import React, { Component } from "react";

handleSubmit = (e) => {
    e.preventDefault();
    this.setState({dog: })
    this.createNewDog();
};

storeInput = (e) => {
    this.setState({
        [e.target.name]: e.target.value
    })
}

createNewDog = () => {
    console.log("Hitting createNewDog fetch call");
    fetch(SERVER_URL+'/habits/'+this.props.user.id, {
        method: 'POST',
        body: JSON.stringify(this.state.dog), // data to send to server
        headers: {
            'Content-Type': 'application/json' // let the server know what's coming
        }
    })
};

class AddDogForm extends Component {
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
            <input type="date" name="birthday" />
          </div>
          <input type="hidden" value={this.props.user.id} name="userId" onChange={this.storeInput} />
          <div>
            <label htmlFor="breed">breed</label>
            <input type="text" name="breed" onChange={this.storeInput} />
          </div>
          <div>
            <label htmlFor="gender">Gender</label>
            <select name="gender" onChange={this.storeInput} >
              <option value="male">M</option>
              <option value="female">F</option>
            </select>
          </div>
          <div>
            <label htmlFor="bio">Tell people about your pup!</label>
            <textbox name="bio" onChange={this.storeInput} />
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
