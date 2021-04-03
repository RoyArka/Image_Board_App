const express = require("express");

const locationSQL = require("./sql/location-queries");
const statusCode = require("./http/status-codes");

const {
  createLocation,
  deleteLocationByName,
  selectAllFromLocation,
} = locationSQL;
const app = express();
const endPointRoot = "/4537/termproject/API/V1";
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("Back-End"));

// functions alphabetized
app.delete(`${endPointRoot}/post`, (req, res) => {
  res.writeHead(statusCode.OK, {
    "Content-Type": "text/html",
    "Access-Control-Allow-Origin": "*",
  });
  const postId = req.query.id;
  res.status(statusCode.OK).end(`Successfully deleted post with id ${postId}`);
});

app.delete(`${endPointRoot}/location`, (req, res) => {
  res.writeHead(statusCode.OK, {
    "Content-Type": "text/html",
    "Access-Control-Allow-Origin": "*",
  });
  const location = req.query.location;
  res
    .status(statusCode.OK)
    .end(`Successfully deleted location with name ${location}`);
});

app.get(`${endPointRoot}/location/:location`, (req, res) => {
  res.writeHead(statusCode.OK, {
    "Content-Type": "text/html",
    "Access-Control-Allow-Origin": "*",
  });
  const location = req.query.location;
  res
    .status(statusCode.OK)
    .end(`Successfully fetched all posts for location ${location}`);
});

app.get(`${endPointRoot}/location`, async (req, res) => {
  console.log("LOCATION", req.body);
  res.writeHead(statusCode.OK, {
    "Content-Type": "text/html",
    "Access-Control-Allow-Origin": "*",
  });
  const selectAllResponse = await selectAllFromLocation();
  res.end(JSON.stringify(selectAllResponse));
});

app.post(`${endPointRoot}/login`, async (req, res) => {
  res.writeHead(statusCode.CREATED, {
    "Content-Type": "text/html",
    "Access-Control-Allow-Origin": "*",
  });
  res.status(statusCode.CREATED).end("Successful Login/Register");
});

app.post(`${endPointRoot}/location`, async (req, res) => {
  res.writeHead(statusCode.CREATED, {
    "Content-Type": "text/html",
    "Access-Control-Allow-Origin": "*",
  });

  const createLocationResponse = await createLocation(req.body.location);
  console.log(createLocationResponse);
  res
    .status(statusCode.CREATED)
    .end(`Successfully Created Location Record: ${req.body.location}`);
});

app.post(`${endPointRoot}/post`, (req, res) => {
  res.writeHead(statusCode.CREATED, {
    "Content-Type": "text/html",
    "Access-Control-Allow-Origin": "*",
  });
  const location = req.query.location;
  res
    .status(statusCode.CREATED)
    .end(`Successful Post creation for location ${location}`);
});

app.put(`${endPointRoot}/user`, (req, res) => {
  res.writeHead(statusCode.OK, {
    "Content-Type": "text/html",
    "Access-Control-Allow-Origin": "*",
  });
  res.status(statusCode.OK).end("Successfully updated username");
});

app.put(`${endPointRoot}/post`, (req, res) => {
  res.writeHead(statusCode.OK, {
    "Content-Type": "text/html",
    "Access-Control-Allow-Origin": "*",
  });
  const postid = req.query.postid;
  res.status(statusCode.OK).end(`Successfully updated post with id ${postid}`);
});

app.listen(port, () => {
  console.log("Connected! Waiting for request on port", port);
});
