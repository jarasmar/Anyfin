import React, { Component } from "react";
import axios from "axios";
import "./styles.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      country: "",
      countryDetails: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ country: event.target.value });
  }

  handleSubmit(event) {
    axios
      .get(`https://restcountries.eu/rest/v2/name/${this.state.country}`)
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            countryDetails: result.data
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );

    event.preventDefault();
  }

  render() {
    const { error, isLoaded, countryDetails } = this.state;

    return (
      <div className="App">
        <h1> Country Finder </h1>

        <div className="form">
          <h2> Search for any country you want </h2>
          <form onSubmit={this.handleSubmit}>
            <label>
              Country:
              <input
                type="text"
                value={this.state.country}
                onChange={this.handleChange}
              />
            </label>
            <input type="submit" value="Submit" />
          </form>
        </div>

        <div className="result">
          <ul>
            {countryDetails.map((item) => (
              <li key={item.name}>
                <h2> {item.name} </h2>
                <p>Capital: {item.capital}</p>
                <p> Population: {item.population} </p>
                <p> Currency: {item.currencies[0].name} </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
