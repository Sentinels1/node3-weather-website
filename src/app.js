const path = require("path");
const express = require("express");
const app = express();
const port = 3000;
const hbs = require("hbs");
const geoCode = require("./utils/geocode");
const forecast = require("./utils/weatherstack");
// console.log(__dirname);
// console.log(path.join(__dirname, "../public"));

//Define path for express config.
const publicPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

// console.log(viewPath);
// console.log(partialPath);

//setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialPath);

//setup static directory to server
app.use(express.static(publicPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "forecast",
    name1: "Nick",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Nick",
    name1: "Nick",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help page",
    message: "Just focous on your work",
    name1: "Nick",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Please provide the address",
    });
  }
  const address = req.query.address;
  geoCode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({
        error: error,
      });
    }
    forecast(latitude, longitude, (error, forecastdata) => {
      if (error) {
        return res.send({
          error: error,
        });
      }
      res.send({
        forecast: forecastdata,
        location: location,
        address: req.query.address,
      });
    });
  });
  // res.send({
  //   forecast: "It is snowing",
  //   location: "Rewa",
  //   address: req.query.address,
  // });
});

app.get("/product", (req, res) => {
  if (!req.query.serach) {
    return res.send({
      error: "You must provide a search term",
    });
  }

  console.log(req.query.serach);
  res.send({
    product: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404page", {
    title: "404",
    name1: "Nick",
    message: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404page", {
    title: "404",
    name1: "Nick",
    message: "Page Not Found",
  });
});

app.listen(port, () => {
  console.log("Server is up and running in port " + port);
});
