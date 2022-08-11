import request from "request";

const forecast = (lat, lon, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=${process.env.WEATHERSTACK_ACCESS_KEY}&query=${lat},%${lon}&units=f`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      //this error is used to indicate problems on OS level like when wifi is turned off (low level error)
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      //this indicates error with the api like when the URL is wrong (eg. both lat and lon is deleted)
      callback("Unable to find location to forecast weather", undefined);
    } else {
      callback(
        undefined,
        body.current.weather_descriptions[0] +
          ". It is currently " +
          body.current.temperature +
          " degrees farhenheit out. It feels like " +
          body.current.feelslike +
          " degrees farhenheit out"
      );
    }
  });
};

export default forecast;
