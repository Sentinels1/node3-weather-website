const request = require("request");

const geoCode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1Ijoibmlja3NpbmdoIiwiYSI6ImNrc2N0dDV4cTAwbjgybm9mbnR0Z3NqYmsifQ.xYyy8qGrIse56NSSyVEgVQ&limit=1";

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to the servers", undefined);
    } else if (response.body.features.length === 0) {
      callback("Unable to find location, Try another search", undefined);
    } else {
      callback(undefined, {
        latitude: response.body.features[0].center[1],
        longitude: response.body.features[0].center[0],
        location: response.body.features[0].place_name,
      });
    }
  });
};

module.exports = geoCode;

//here we can use address also in place of encodedURIComponenet but using this will be safe for us it will handle request correctly
