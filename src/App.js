import React, { Component } from "react";
import axios from "axios";
import "./styles.css";
import { HiArrowCircleRight } from "react-icons/hi";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      country: "",
      countryDetails: [{
        name: "Sweden",
        capital: "Stockholm",
        population: 9894888,
        flag: "https://restcountries.eu/data/swe.svg",
        currencies : [{
          code: "SEK", 
          name: "Swedish krona", 
          symbol: "kr"
        }]
      }],
      currencyCode: "SEK",
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

  bringCurrencyFront() {
    document.getElementById('country-container').style.zIndex = 1;
    document.getElementById('currency-container').style.zIndex = 100;
  }

  bringCountryFront() {
    document.getElementById('country-container').style.zIndex = 100;
    document.getElementById('currency-container').style.zIndex = 1;
  }

  render() {
    const { countryDetails } = this.state;
    if (this.state.countryDetails.length !== 0) {
      this.state.currencyCode = this.state.countryDetails[0].currencies[0].code;
    }

    return (
      <div className="App">
        <div className="country-container" id="country-container">
          <div className="country-nav">
            <div className="country-nav-title">
              <h1>COUNTRY</h1>
            </div>
            <div className="country-nav-button">
              <button onClick={this.bringCurrencyFront}><h1>CURRENCY</h1></button>
            </div>
          </div>

          <div className="country-form">
            <h2> Country Finder </h2>
            <form onSubmit={this.handleCountrySubmit}>
              <label>
                <input
                  type="text"
                  placeholder="Type country..."
                  value={this.state.country}
                  onChange={this.handleCountryChange}
                />
              </label>
              <input type="submit" value="Search" id="submit-button" />
            </form>
          </div>
      
          <div className="country-result">
            <div className="country-flag-container">
              <div className="flag">
                {countryDetails.map((item) => (
                  <img src={item.flag} alt="flag" />
                ))}
              </div>
            </div>
            <div className="country-details-container">
              <div className="details">
                <ul>
                  {countryDetails.map((item) => (
                    <li key={item.name}>
                      <h1> {item.name} </h1>
                      <p><strong>Capital: </strong>{item.capital}</p>
                      <p><strong>Population: </strong> {item.population}</p>
                      <p><strong>Currency: </strong> {item.currencies[0].name} </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        
        <div className="currency-container" id="currency-container">
          <div className="currency-nav">
            <div className="currency-nav-button">
              <button onClick={this.bringCountryFront}><h1>COUNTRY</h1></button>
            </div>
            <div className="currency-nav-title">
              <h1>CURRENCY</h1>
            </div>
          </div>
          
          <div className="currency-intro">
            <h2> Money Exchange </h2>
            <h4>Insert any amount of Swedish Krona to get the conversion to the local currency</h4>
            <h4> 
              {this.state.countryDetails[0].name}'s currency is {this.state.countryDetails[0].currencies[0].name} ({this.state.countryDetails[0].currencies[0].symbol})
            </h4>
          </div>
          
          <div className="currency-form">
            <div className="currency-input-container">
              <div className="input">
                <div className="input-amount">
                    <input
                      type="number"
                      placeholder="Amount"
                      value={this.state.money}
                      onChange={this.handleMoneyChange}
                    />
                </div>
                <div className="input-code">
                  <h2>SEK</h2>
                </div>
              </div>
            </div>
            
            <div className="currency-button-container">
              <a onClick={this.handleMoneySubmit}><HiArrowCircleRight className="currency-button"/></a>
            </div>

            <div className="currency-output-container">
              <div className="output">
                <div className="output-amount">
                  <h2> {(this.state.exchangeAmount * this.state.exchangeRate).toFixed(2)} </h2>
                </div>
                <div className="output-code">
                  <h2> {this.state.currencyCode} </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
