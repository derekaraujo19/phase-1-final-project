// API INFO:

const API_KEY = 'qczPsOADZkaEaGFJRLY2aCdmWlJnOCqn';
// GEOCODE: http://www.mapquestapi.com/geocoding/v1/address?key=qczPsOADZkaEaGFJRLY2aCdmWlJnOCqn&location=Westhampton,NY
// NWS: https://www.weather.gov/documentation/services-web-api#/ , https://weather-gov.github.io/api/gridpoints
    // My example loc: Lat: 40.825980 Long: -72.643300
    // Hourly forecast endpoint: https://api.weather.gov/gridpoints/OKX/78,47/forecast/hourly






// Handle Form Submit:
let locField = document.getElementById('send-location');
locField.addEventListener('submit', (e) => {
  e.preventDefault();
  const locString = e.target.querySelector('#new-location').value;
  getLatLong(locString);
  // locField.reset();
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
    const latLong = data.results[0].locations[0].latLng
    getTemp(latLong.lat, latLong.lng);
  })
}

// Append to DOM:
const renderResult = (temperature) => {
  document.querySelector('#result').innerText = "GRAB A LIGHT JACKET. IT'S GOING TO BE CHILLY.";
  // this is where my conditional statements are going to go
}




