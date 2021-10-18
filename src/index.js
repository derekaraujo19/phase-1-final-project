// Grab the form
let locField = document.getElementById('send-location');
// click event on submit that:
  // makes fetch request to geocoding API to get coordinates
  // response gets sent to another fetch to the Weather API
locField.addEventListener('submit', (e) => {
  e.preventDefault();
  const locString = e.target.querySelector('#new-location').value;
  getLatLong(locString);
})



// NWS API:
  // https://weather-gov.github.io/api/gridpoints

  // GEOCODING API:
    // https://geocoding.geo.census.gov/geocoder/Geocoding_Services_API.html



    // Lat: 40.825980 Long: -72.643300
    // https://api.weather.gov/gridpoints/OKX/78,47/forecast/hourly



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


const renderResult = (temperature) => {
  document.querySelector('#result').innerText = temperature;
}

const API_KEY = 'qczPsOADZkaEaGFJRLY2aCdmWlJnOCqn';

// http://www.mapquestapi.com/geocoding/v1/address?key=qczPsOADZkaEaGFJRLY2aCdmWlJnOCqn&location=Westhampton,NY

const getLatLong = (locString) => {
  fetch(`http://www.mapquestapi.com/geocoding/v1/address?key=${API_KEY}&location=${locString}`)
  .then(res => res.json())
  .then(data => {
    const latLong = data.results[0].locations[0].latLng
    getTemp(latLong.lat, latLong.lng);
  })
}

