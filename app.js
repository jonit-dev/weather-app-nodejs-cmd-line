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

    MapBox.getAddressLatLng(address, (error, data) => {
      if (error) {
        console.log(error);
        return false;
      }

      const { lng, lat, location } = data;

      DarkSky.fetchWeatherInfo(lat, lng, (error, data) => {
        if (error) {
          console.log(error);
          return false;
        }

        const { summary, temperature, humidity, windSpeed } = data.currently;

        console.log(`This is the weather summary about ${chalk.red.inverse(
          location
        )}: 
        => Latitude: ${chalk.yellow.inverse(lat)} 
        => Longitude: ${chalk.yellow.inverse(lng)}
        => Summary: ${chalk.yellow.inverse(summary)}
        => Temperature: ${chalk.blue.inverse(temperature + " C")}
        => Humidity: ${chalk.blue.inverse(humidity + "%")}
        => Wind Speed: ${chalk.blue.inverse(windSpeed + "mph")}
        
        `);
      });
    });
  }
}).argv;
