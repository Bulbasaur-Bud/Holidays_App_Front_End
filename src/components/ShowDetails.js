import React, { Component } from "react";

class ShowDetails extends Component {
  render() {
    return (
      <div>
        <h2>Holiday Info</h2>
        <h3>Name: {this.props.holiday.name}</h3>
        <h4>
          Celebrated:{" "}
          {this.props.holiday.celebrated ? "Yes Celebrated" : "Not Celebrated"}
        </h4>
        <h4>Likes:{this.props.holiday.likes}</h4>
        <h5>Description:{this.props.holiday.description}</h5>
      </div>
    );
  }
}

export default ShowDetails;
