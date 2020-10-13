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

- Display an input box next to the currency that takes an amount of SEK and makes a call to the Fixer API.

  ```
  https://data.fixer.io/api/convert
    ? access_key = API_KEY
    & from = GBP            // {item.currencies[0].code}
    & to = SEK
    & amount = 25
  ```

- Take the API response and display the amount of SEK translated to the local currency of the country.
  ```
  {
    "success": true,
    "query": {
        "from": "GBP",
        "to": "SEK",
        "amount": 25
    },
    "info": {
        "timestamp": 1519328414,
        "rate": 148.972231
    },
    "historical": ""
    "date": "2020-10-13"
    "result": 3724.305775
}  
  ```
