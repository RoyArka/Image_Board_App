// library imports first
const express = require("express");

// remaining imports alphabetized
const sqlQueries = require("./util/sql-queries");

const {
  deleteRowFromTable,
  insert,
  update,
  selectAll,
  selectLastRow,
} = sqlQueries;


const app = express();
const endPointRoot = "COMP4537/termproj/api/v1/";
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("Front-End"));
app.use("/css", express.static(__dirname + "/css"));
app.use("/js", express.static(__dirname + "/js"));


//functions alphabetized
app.delete(endPointRoot, (req, res) => {
  // TODO: DELETE Logic
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html")
});

app.get("/admin", (req, res) => {
  res.sendFile(__dirname + "/admin.html")
});

app.get(endPointRoot, (req, res) => {
    // TODO: GET Logic
});

app.post(endPointRoot, (req, res) => {
    // TODO: POST Logic
});

app.put(endPointRoot, (req, res) => {
    // TODO: PUT Logic
});

app.listen(port, () => {
    console.log("Connected! Waiting for request on port", port);
});