# Anyfin Assignment

Create a simple web interface using React which allows users to:

a) Search for countries and display its full country name, capital, population and currency. This can be a simple list, but you can also get creative in how to vizualise these data points.

b) Enter an amount in SEK and get the amount converted into local currency for each country.

## How it works

- Display a search box that takes the name of a country as input and makes a call to the restcountries API.

  > Use the search by country name function (it can be the native name or partial name) `https://restcountries.eu/rest/v2/name/{name}`

- Take the API response and display the country name, capital, population and currency.

  > You can filter the output of your request to include only the specified fields. `https://restcountries.eu/rest/v2/{service}?fields={field};{field};{field}`

  ```
  [[{
    "name": "Colombia",
    "capital": "Bogotá",
    "population": 48759958,
    "currencies": [{
      "code": "COP",
      "name": "Colombian peso",
      "symbol": "$"
    }]
  }]
  ```

- Display an input box next to the currency that takes an amount of SEK and makes a call to the Exchange Rate API.

  ```
  https://api.exchangeratesapi.io/latest
  ?base=SEK
  &symbols=COP      // ${this.state.countryDetails[0].currencies[0].code}
  ```

- Take the API response and display the amount of SEK translated to the local currency of the country.
  ```
  {
  "base": "SEK",
  "date": "2020-10-14",
  "rates": {
    "COP": 1.565
  }
}
  ```
