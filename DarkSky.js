const request = require("request");

const fetchWeatherInfo = (lat, lng, callback) => {
  const url = `https://api.darksky.net/forecast/bb14363213e658164e0729d76b62f5ca/${lat},${lng}?units=si`;

  request(
    {
      url,
      json: true
    },
    (error, response) => {
      //callback

      if (error) {
        callback("Unable to connect to weather services", undefined);
      } else if (response.body.code) {
        callback("Unable to find location", undefined);
      } else {
        return callback(undefined, response.body);
      }
    }
  );
};

module.exports = {
  fetchWeatherInfo
};
