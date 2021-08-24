const express = require("express");
const app = express();
const port = 3000;

app.get("", (req, res) => {
  res.send("<h1>Weather</h1>");
});

app.get("/help", (req, res) => {
  res.send({
    name: "Nick",
    age: 20,
  });
});

app.get("/about", (req, res) => {
  res.send("<h1>About</h1>");
});

app.get("/weather", (req, res) => {
  res.send({
    forecast: "Example",
    location: "Example",
  });
});

app.listen(port, () => {
  console.log("Server is up and running in port " + port);
});

console.log(__dirname);
console.log(__filename);
