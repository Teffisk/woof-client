import React, { Component } from "react";
import SERVER_URL from "../constants/server";

class DogList extends Component {
  constructor(props) {
    super(props);
    this.state = { dogs: props.dogs, user: props.user };
  }

  calculateAge = birthday => {
    // birthday is a date
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  render() {
    const dogList = this.props.dogs.map(d => {
      return (
        <div>
          <h2>{d.name}</h2>
          <img src={d.image} className="dog-profile-pic" />
          <p>
            {d.name} is a {d.gender} {d.breed} who lives with{" "}
            <a href="#">{this.props.user.username}</a>. Here's some info about{" "}
            {d.name}!
          </p>
          <p>Bio: {d.bio}</p>
        </div>
      );
    });
    return (
      <div>
        <h2>Dog List</h2>
        <div>{dogList}</div>
      </div>
    );
  }
}

export default DogList;
