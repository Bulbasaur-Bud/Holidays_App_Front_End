import React, { Component } from "react";

class UpdateForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.holiday._id,
      name: this.props.holiday.name,
      celebrated: this.props.holiday.celebrated,
      likes: this.props.holiday.likes,
      description: this.props.holiday.description,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch(this.props.baseURL + "/holidays/" + this.state.id, {
      method: "PUT",
      body: JSON.stringify({
        name: this.state.name,
        celebrated: this.state.celebrated,
        likes: this.state.likes,
        description: this.state.description,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((updatedHoliday) => {
        this.props.handleUpdateHoliday(updatedHoliday);
        this.setState({
          id: "",
          name: "",
          celebrated: "",
          likes: "",
          description: "",
        });
      });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={this.state.name}
          onChange={this.handleChange}
        />
        <br />
        <label htmlFor="celebrated">Celebrated</label>
        <input
          type="text"
          id="celebrated"
          value={this.state.celebrated}
          onChange={this.handleChange}
        />
        <br />
        <label htmlFor="likes">Likes</label>
        <input
          type="number"
          id="likes"
          value={this.state.likes}
          onChange={this.handleChange}
        />
        <br />
        <label htmlFor="description">Description</label>
        <input
          type="text"
          id="description"
          value={this.state.description}
          onChange={this.handleChange}
        />
        <br />
        <input type="submit" value="Update Details" />
      </form>
    );
  }
}
export default UpdateForm;
