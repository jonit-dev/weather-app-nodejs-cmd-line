const request = require("request");

const fetchWeatherInfo = (lat, lng) => {
  const url = `https://api.darksky.net/forecast/bb14363213e658164e0729d76b62f5ca/${lat},${lng}?units=si`;

  return new Promise((resolve, reject) => {
    try {
      request(
        {
          url,
          json: true
        },
        (error, response) => {
          //callback

          return resolve(response.body);
        }
      );
    } catch (error) {
      console.log("Error: Unable to fetch weather information!");

      console.log(error);
      reject(error);
    }
  });
};

module.exports = {
  fetchWeatherInfo
};
