import geocode from "./utils/geocode.js";
import forecast from "./utils/forecast.js";
import dotenv from "dotenv";

dotenv.config();

const locn = process.argv[2];
if (locn) {
  geocode(locn, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return console.log(error);
    }
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return console.log(error);
      }
      console.log("Forecast weather for Location : " + location);
      console.log(forecastData);
    });
  });
} else {
  console.log("Provide a location to forecast weather for in the command line");
}
