//express server for front-end routing

// library imports first
const express = require("express");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("Front-End"));
app.use("/css", express.static(__dirname + "/css"));
app.use("/js", express.static(__dirname + "/js"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
});
  
app.get("/admin", (req, res) => {
    res.sendFile(__dirname + "/admin.html")
});

app.listen(port, () => {
    console.log("Connected! Waiting for request on port", port);
});