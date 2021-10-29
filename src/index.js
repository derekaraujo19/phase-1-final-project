document.addEventListener('DOMContentLoaded', () => {
  // API INFO:
  const API_KEY = '';
  // GEOCODE ENDPOINT: http://www.mapquestapi.com/geocoding/v1/address?key= <api key > &location=Westhampton,NY

  // NWS: https://www.weather.gov/documentation/services-web-api#/ , https://weather-gov.github.io/api/gridpoints
      // My example loc: Lat: 40.825980 Long: -72.643300
      // Hourly forecast endpoint: https://api.weather.gov/gridpoints/OKX/78,47/forecast/hourly



  // Handle Form Submit:
  let locField = document.getElementById('send-location');
  let location = '';
  locField.addEventListener('submit', (e) => {
    e.preventDefault();
    const locString = e.target.querySelector('#new-location').value;
    location = locString;
    getLatLong(locString);
    locField.reset();
  })


  // Weather Requests (first gets to loc, next gets current hour):
  const getTemp = (lat, long) => {
    fetch(`https://api.weather.gov/points/${lat},${long}`)
    .then(res => res.json())
    .then(data => {
      fetch(data.properties.forecastHourly)
      .then(res => res.json())
      .then(data => {
        renderResult(data.properties.periods[0].temperature);
      })
    })
  }

  // Geocode Request to translate city/state to lat/long:
  const getLatLong = (locString) => {
    fetch(`http://www.mapquestapi.com/geocoding/v1/address?key=${API_KEY}&location=${locString}`)
    .then(res => res.json())
    .then(data => {
      const latLong = data.results[0].locations[0].latLng;
      getTemp(latLong.lat, latLong.lng);
    })
  }

  // Append to DOM:
  const renderResult = (temperature) => {
    const result = document.querySelector('#result');
    // const suggestions = document.createElement("div");
    const t = temperature;
    if (t < 35) {
      result.innerText = "BREAK OUT YOUR PARKA AND HAND WARMERS. IT'S FREEZING.";
    } else if (t >= 35 && t < 55) {
      result.innerText = "DON'T FORGET TO LAYER UNDER A MEDIUM-TO-HEAVY COAT.";
    } else if (t >= 55 && t < 64) {
      result.innerText = "IT'S SWEATER + JACKET WEATHER.";
    } else if (t >= 64 && t < 70) {
      result.innerText = "THROW A LIGHT JACKET IN YOUR BAG IN CASE YOU GET CHILLY."
    } else if (t >= 70 && t < 80) {
      result.innerText = "YOU'LL DO FINE IN A T-SHIRT AND JEANS.";
    } else {
      result.innerText = "PACK A BATHING SUIT AND HEAD TO THE NEAREST POOL. IT'S A HOT ONE.";
    }
    // result.append(suggestions);

    // Append refresh button to result
    const refreshBtn = document.createElement("button");
    refreshBtn.className = 'refresh';
    refreshBtn.innerText = "Got it";
    refreshBtn.addEventListener('click', () => {
      window.location.reload();
    })
    result.append(refreshBtn);

    // Append temperature at bottom of result
    let temp = document.createElement('div');
    temp.className = 'temp';
    temp.innerText = temperature + '° ' + location;
    result.appendChild(temp);
  }

})






