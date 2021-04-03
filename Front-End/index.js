//express server for front-end routing

//library imports first
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("Front-End"));
app.use("/css", express.static(__dirname + "/css"));
app.use("/js", express.static(__dirname + "/js"));

//home page
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/home.html");
});

//profile page
app.get("/profle", (req, res) => {
  res.sendFile(__dirname + "/profile.html");
});

//stats page for requests
app.get("/stats", (req, res) => {
  res.sendFile(__dirname + "/admin.html");
});

//documentation page
app.get("/doc", (req, res) => {
  res.sendFile(__dirname + "/documentation.html");
});

//logsout to login page
app.get("/logout", (req, res) => {
  res.sendFile(__dirname + "/login.html");
});

app.listen(port, () => {
  console.log("Connected! Waiting for request on port", port);
});
