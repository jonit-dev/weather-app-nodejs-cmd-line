/*#############################################################|
|  >>> WEATHER APP: explore the basics of async programming
*##############################################################*/
const request = require("request");
const chalk = require("chalk");
const DarkSky = require("./DarkSky");
const yargs = require("yargs");
const MapBox = require("./Mapbox");

const MAPBOX_TOKEN =
  "pk.eyJ1Ijoiam9uaXQiLCJhIjoiY2p6NjhmaXBwMDRsbjNubWl1OGFrb2lpMCJ9.NJYtPHNvyQEdHqQSCy9y7A";

yargs.command({
  command: "check_weather",
  describe: "get current weather information for a specific address",
  builder: {
    address: {
      describe: "Address to check weather info from", //help description
      demandOption: true, //set option as required
      type: "string"
    }
  },
  handler: function(argv) {
    const { address } = argv;

    //address: https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1Ijoiam9uaXQiLCJhIjoiY2p6NjhmaXBwMDRsbjNubWl1OGFrb2lpMCJ9.NJYtPHNvyQEdHqQSCy9y7A

    MapBox.getAddressLatLng(address)
      .then(response => {
        console.log("Getting address weather information...");

        if (!response.features.length) {
          console.log(chalk.red("No results found!"));

          return false;
        }

        const [lng, lat] = response.features[0].center;
        const { place_name } = response.features[0];

        // console.log(`Lat=${lat}  Lng=${lng}`);

        DarkSky.fetchWeatherInfo(lat, lng)
          .then(response => {
            const { currently } = response;

            console.log(`The weather forecast for ${chalk.red.inverse(
              place_name
            )} is:
                 => Summary: ${currently.summary}
                 => Temperature (Celsius): ${currently.temperature}        
                `);
          })
          .catch(err => {
            console.log(
              chalk.red(
                "DarkSky: Error while fetching information! More details below"
              )
            );

            console.log(err);
          });
      })
      .catch(err => {
        console.log(
          chalk.red(
            "MapBox: Error while fetching information! More details below"
          )
        );
        console.log(err);
      });
  }
}).argv;
