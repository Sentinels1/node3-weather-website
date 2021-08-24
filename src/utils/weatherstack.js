const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=bcbe96973dbf0d9450c2f58d50b0a71f&query=" +
    encodeURIComponent(latitude) +
    "," +
    encodeURIComponent(longitude) +
    "&units=m";
  request({ url: url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to the servers!", undefined);
    } else if (body.error) {
      callback("Unable to find the location", undefined);
    } else {
      callback(
        undefined,
        body.current.weather_descriptions[0] +
          ", it is currently " +
          body.current.temperature +
          " degress out. But it feels like " +
          body.current.feelslike +
          " degress out." +
          " And Cloudcover is about " +
          body.current.cloudcover
      );
    }
  });
};

module.exports = forecast;

//here we can use address also in place of encodedURIComponenet but using this will be safe for us it will handle request correctly
