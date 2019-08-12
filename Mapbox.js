const request = require("request");

module.exports = {
  getAddressLatLng(address, callback) {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
      address
    )}.json?access_token=pk.eyJ1Ijoiam9uaXQiLCJhIjoiY2p6NjhmaXBwMDRsbjNubWl1OGFrb2lpMCJ9.NJYtPHNvyQEdHqQSCy9y7A&limit=1`;

    request(
      {
        url,
        json: true
      },
      (error, response) => {
        if (error) {
          callback("Unable to connect to location services", undefined); //sending error as callback
        } else if (response.body.features.length === 0) {
          callback("No results found", undefined);
        } else {
          const [lng, lat] = response.body.features[0].center;
          const location = response.body.features[0].place_name;

          callback(undefined, {
            //remember to pass the error as undefined.
            lng,
            lat,
            location
          });
        }
      }
    );
  }
};
