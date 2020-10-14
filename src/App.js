import React, { Component } from "react";
import axios from "axios";
import "./styles.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      country: "",
      countryDetails: [],
      exchangeAmount: 0,
      exchangeRate: 0
    };

    this.handleCountryChange = this.handleCountryChange.bind(this);
    this.handleCountrySubmit = this.handleCountrySubmit.bind(this);

    this.handleMoneyChange = this.handleMoneyChange.bind(this);
    this.handleMoneySubmit = this.handleMoneySubmit.bind(this);
  }

  handleCountryChange(event) {
    this.setState({ country: event.target.value });
  }

  handleCountrySubmit(event) {
    axios
      .get(`https://restcountries.eu/rest/v2/name/${this.state.country}`)
      .then(
        (result) => {
          this.setState({
            countryDetails: result.data
          });
          console.log(this.state.countryDetails);
        },
        (error) => {
          this.setState({
            country: "Enter a valid input"
          });
          console.log(error);
        }
      );

    event.preventDefault();
  }

  handleMoneyChange(event) {
    this.setState({ exchangeAmount: event.target.value });
  }

  handleMoneySubmit(event) {
    axios
      .get(`https://api.exchangeratesapi.io/latest?base=SEK&symbols=${this.state.countryDetails[0].currencies[0].code}`)
      .then(
        (result) => {
          this.setState({
            exchangeRate: result.data['rates'][`${this.state.countryDetails[0].currencies[0].code}`]
          });

          console.log(this.state.exchangeRate);
        },
        (error) => {
          this.setState({
            money: "Enter a valid input"
          });
          console.log(error);
        }
      );

    event.preventDefault();
  }

  render() {
    const { countryDetails, exchangeRate } = this.state;

    return (
      <div className="App">
        <h1> Country Finder </h1>

        <div className="country-form">
          <h2> Search for any country you want </h2>
          <form onSubmit={this.handleCountrySubmit}>
            <label>
              Country:
              <input
                type="text"
                value={this.state.country}
                onChange={this.handleCountryChange}
              />
            </label>
            <input type="submit" value="Submit" />
          </form>
        </div>

        <div className="country-result">
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

        <div className="money-form">
          <h2> Money Exchange </h2>
          <form onSubmit={this.handleMoneySubmit}>
            <label>
              Amount:
              <input
                type="number"
                value={this.state.money}
                onChange={this.handleMoneyChange}
              />
            </label>
            <input type="submit" value="Change" />
          </form>
        </div>

        <div className="money-result">
          <h2>Exchange result</h2>
          <h2> {this.state.exchangeAmount * this.state.exchangeRate} </h2>
        </div>
      </div>
    );
  }
}

export default App;
