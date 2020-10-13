import React, { Component } from "react";
import axios from "axios";
import "./styles.css";

class App extends Component {
  state = {
    error: null,
    isLoaded: false,
    items: []
  };

  componentDidMount() {
    axios.get("https://restcountries.eu/rest/v2/all").then(
      (result) => {
        this.setState({
          isLoaded: true,
          items: result.data
        });
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      }
    );
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="App">
          <h1> Countries in the World </h1>
          <ul>
            {items.map((item) => (
              <li key={item.name}>
                <h2> {item.name} </h2>
                <p>Capital: {item.capital}</p>
                <p> Population: {item.population} </p>
                <p> Currency: {item.currencies[0].name} </p>
              </li>
            ))}
          </ul>
        </div>
      );
    }
  }
}

export default App;
