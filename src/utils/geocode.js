const request = require("postman-request");

const geocode = (address, callback) => {
  const url =
    "http://api.positionstack.com/v1/forward?access_key=4d48b18c8e8f687d304f5f8e1a5db6d2&query=" +
    encodeURIComponent(address);

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to location services!", undefined);
    } else if (body.error || body.data.length === 0) {
      callback("Unable to find location.Try another search.", undefined);
    } else {
      callback(undefined, {
        location:
          body.data[0].name +
          ", " +
          body.data[0].region +
          ", " +
          body.data[0].country,
        latitude: body.data[0].latitude,
        longitude: body.data[0].longitude,
      });
    }
  });
};

module.exports = geocode;
