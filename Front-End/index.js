const express = require("express");
const swaggerUi = require("swagger-ui-express");

const swaggerDocument = require("../swagger.json");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("Front-End"));
app.use("/css", express.static(__dirname + "/css"));
app.use("/js", express.static(__dirname + "/js"));
app.use(
  "/documentation.html",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument),
);

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
