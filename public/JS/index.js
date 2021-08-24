// const e = require("express");

// fetch("https://puzzle.mead.io/puzzle").then((response) => {
//   response.json().then((data) => {
//     console.log(data);
//   });
// });

const weather = document.querySelector("form");
const serach = document.querySelector("input");
const messageOne = document.querySelector(".message-one");
const messageTwo = document.querySelector(".message-two");

// messageOne.textContent = "Nick";

weather.addEventListener("submit", (event) => {
  event.preventDefault();

  const location = serach.value;
  // console.log(location);
  messageOne.textContent = "Loading.....";
  messageTwo.textContent = "";
  fetch(
    "http://localhost:3000/weather?address=" + encodeURIComponent(location)
  ).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        // console.log(data.error);
        messageOne.textContent = data.error;
      } else {
        // console.log(data.forecast);
        messageOne.textContent = data.location;
        // console.log(data.location);
        messageTwo.textContent = data.forecast;
      }
    });
  });
});
