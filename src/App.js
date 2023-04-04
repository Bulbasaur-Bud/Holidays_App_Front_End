import React, { Component } from "react";
import "./App.css";
import NewForm from "./components/NewForm";
import ShowDetails from "./components/ShowDetails";
import UpdateForm from "./components/UpdateForm";
import edit from "./images/pencil-icon.png";

let baseURL = "http://localhost:3003";

//We need to set a state to store the data from the backend!
//CORS = Cross Origin Resource Sharing
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      holidays: [],
      holiday: {},
      displayUpdateForm: false,
      updateHoliday: {},
      updateHolidayDetails: {},
    };
    this.getHolidays = this.getHolidays.bind(this);
    this.handleAddHoliday = this.handleAddHoliday.bind(this);
    this.deleteHoliday = this.deleteHoliday.bind(this);
    this.showDetails = this.showDetails.bind(this);
    this.toggleCelebrated = this.toggleCelebrated.bind(this);
    this.handleUpdateHoliday = this.handleUpdateHoliday.bind(this);
    this.toggleUpdateForm = this.toggleUpdateForm.bind(this);
  }

  handleUpdateHoliday(updatedHoliday) {
    const currentHolidays = [...this.state.holidays];
    const findIndex = currentHolidays.findIndex(
      (currentHoliday) => currentHoliday._id === updatedHoliday._id
    );
    currentHolidays[findIndex] = updatedHoliday;
    this.setState({ holidays: currentHolidays, displayUpdateForm: false });
  }

  toggleUpdateForm(holidayToUpdate) {
    this.setState({
      displayUpdateForm: true,
      updateHolidayDetails: holidayToUpdate,
    });
  }

  handleAddHoliday(holiday) {
    const currentHolidays = [...this.state.holidays];
    currentHolidays.unshift(holiday);
    this.setState({
      holidays: currentHolidays,
      name: "",
    });
  }

  getHolidays() {
    fetch(baseURL + "/holidays")
      .then(
        (data) => {
          return data.json();
        },
        (err) => console.log(err)
      )
      .then(
        (parsedData) => {
          this.setState({ holidays: parsedData });
        }
        //(err) => console.log(err)
      );
  }
  componentDidMount() {
    this.getHolidays();
  }

  toggleCelebrated(holiday) {
    fetch(baseURL + "/holidays/" + holiday._id, {
      method: "PUT",
      body: JSON.stringify({ celebrated: !holiday.celebrated }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((resJson) => {
        const currentHolidayDetails = [...this.state.holidays];
        const findIndex = this.state.holidays.findIndex(
          (holiday) => holiday._id === resJson._id
        );
        currentHolidayDetails[findIndex].celebrated = resJson.celebrated;
        this.setState({ holidays: currentHolidayDetails });
      });
  }

  deleteHoliday(id) {
    fetch(baseURL + "/holidays/" + id, {
      method: "DELETE",
    }).then((response) => {
      const findIndex = this.state.holidays.findIndex(
        (holiday) => holiday._id === id
      );
      const exisitingHolidays = [...this.state.holidays];
      exisitingHolidays.splice(findIndex, 1);
      this.setState({ holidays: exisitingHolidays });
    });
  }

  showDetails(holidayDetails) {
    this.setState({ holiday: holidayDetails });
  }

  render() {
    return (
      <div>
        <h1>Holidays! Yeayyy!</h1>
        <NewForm handleAddHoliday={this.handleAddHoliday} baseURL={baseURL} />
        <table>
          <tbody>
            {this.state.holidays.map((holiday) => {
              return (
                <tr
                  key={holiday._id}
                  onDoubleClick={() => this.toggleCelebrated(holiday)}
                >
                  <td
                    onMouseOver={() => {
                      this.showDetails(holiday);
                    }}
                  >
                    {holiday.name}
                  </td>
                  {/*<td
                    onClick={() => {
                      this.toggleUpdateForm(holiday);
                    }}
                  >
                    Edit
                  </td> */}
                  <td>
                    <img
                      src={edit}
                      alt="Edit"
                      onClick={() => {
                        this.toggleUpdateForm(holiday);
                      }}
                    />
                  </td>

                  <td onClick={() => this.deleteHoliday(holiday._id)}>X</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <ShowDetails holiday={this.state.holiday} />
        {this.state.displayUpdateForm ? (
          <UpdateForm
            baseURL={baseURL}
            holiday={this.state.updateHolidayDetails}
            handleUpdateHoliday={this.handleUpdateHoliday}
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default App;
