const request = require("request");

module.exports = {
  getAddressLatLng(address) {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
      address
    )}.json?access_token=pk.eyJ1Ijoiam9uaXQiLCJhIjoiY2p6NjhmaXBwMDRsbjNubWl1OGFrb2lpMCJ9.NJYtPHNvyQEdHqQSCy9y7A&limit=1`;

    // console.log("Fetching info from...");

    // console.log(url);

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
        console.log(error);
        reject(error);
      }
    });
  }
};
