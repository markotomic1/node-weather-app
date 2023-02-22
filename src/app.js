const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode.js");
const forecast = require("./utils/forecast.js");

const app = express();

// define paths for express config
const viewsPath = path.join(__dirname, "../templates/views");
const publicPath = path.join(__dirname, "../public");
const partialsPath = path.join(__dirname, "../templates/partials");

//setup handle bars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Marko",
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Marko",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    msg: "Help message",
    name: "Marko",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "You must provide address" });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) return res.send({ error });

      forecast(latitude, longitude, (err, forecastData) => {
        if (error) return res.send({ err });

        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/help/*", (req, res) => {
  res.render("error", {
    title: "404",
    name: "Marko",
    msg: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("error", {
    title: "404",
    name: "Marko",
    msg: "Page not found",
  });
});

app.listen(3000, () => {
  console.log("Serrver is up on port 3000");
});
