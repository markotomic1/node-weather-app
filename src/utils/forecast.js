const request = require("postman-request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=51a5cfbd3897b897a898365d444daaf0&query=" +
    latitude +
    "," +
    longitude;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather stack api", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else
      callback(
        undefined,
        body.current.weather_descriptions[0] +
          ". It is currently " +
          body.current.temperature +
          " degrees  but it feels like " +
          body.current.feelslike
      );
  });
};

module.exports = forecast;
