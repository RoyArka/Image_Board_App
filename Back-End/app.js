const express = require("express");
const swaggerUi = require("swagger-ui-express");

const locationSQL = require("./sql/location-queries");
const statisticsSQL = require("./sql/stat-queries");
const statusCode = require("./http/status-codes");
const swaggerDocument = require("../swagger.json");
const requestType = require("./http/request-types");

const { createLocation, selectAllFromLocation } = locationSQL;
const { incrementEndpointStats, selectAllFromStats } = statisticsSQL;
const app = express();
const endPointRoot = "/4537/termproject/API/V1";
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("Back-End"));
app.use("/documentation", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// functions alphabetized
app.delete(`${endPointRoot}/location`, async (req, res) => {
  res.writeHead(statusCode.OK, {
    "Content-Type": "text/html",
    "Access-Control-Allow-Origin": "*",
  });
  const location = req.query.location;
  await incrementEndpointStats(`${endPointRoot}/location`, requestType.DELETE);
  res
    .status(statusCode.OK)
    .end(`Successfully deleted location with name ${location}`);
});

app.delete(`${endPointRoot}/post`, async (req, res) => {
  res.writeHead(statusCode.OK, {
    "Content-Type": "text/html",
    "Access-Control-Allow-Origin": "*",
  });
  const postId = req.query.id;
  res.status(statusCode.OK).end(`Successfully deleted post with id ${postId}`);
});

app.get(`${endPointRoot}/location/:location`, async (req, res) => {
  res.writeHead(statusCode.OK, {
    "Content-Type": "text/html",
    "Access-Control-Allow-Origin": "*",
  });
  const location = req.query.location;
  await incrementEndpointStats(
    `${endPointRoot}/location/:location`,
    requestType.GET,
  );
  res
    .status(statusCode.OK)
    .end(`Successfully fetched all posts for location ${location}`);
});

app.get(`${endPointRoot}/location`, async (req, res) => {
  res.writeHead(statusCode.OK, {
    "Content-Type": "text/html",
    "Access-Control-Allow-Origin": "*",
  });

  const selectAllResponse = await selectAllFromLocation();
  console.log(selectAllResponse);
  await incrementEndpointStats(`${endPointRoot}/location`, requestType.GET);

  res.end(JSON.stringify(selectAllResponse));
});

app.get(`${endPointRoot}/stats`, async (req, res) => {
  res.writeHead(statusCode.OK, {
    "Content-Type": "text/html",
    "Access-Control-Allow-Origin": "*",
  });

  const selectAllResponse = await selectAllFromStats();
  await incrementEndpointStats(`${endPointRoot}/stats`, requestType.GET);

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
  await incrementEndpointStats(`${endPointRoot}/location`, requestType.POST);
  console.log(createLocationResponse);
  res
    .status(statusCode.CREATED)
    .end(`Successfully Created Location Record: ${req.body.location}`);
});

app.post(`${endPointRoot}/post`, async (req, res) => {
  res.writeHead(statusCode.CREATED, {
    "Content-Type": "text/html",
    "Access-Control-Allow-Origin": "*",
  });
  const location = req.query.location;
  await incrementEndpointStats(`${endPointRoot}/post`, requestType.POST);
  res
    .status(statusCode.CREATED)
    .end(`Successful Post creation for location ${location}`);
});

app.put(`${endPointRoot}/user`, async (req, res) => {
  res.writeHead(statusCode.OK, {
    "Content-Type": "text/html",
    "Access-Control-Allow-Origin": "*",
  });
  await incrementEndpointStats(`${endPointRoot}/user`, requestType.PUT);
  res.status(statusCode.OK).end("Successfully updated username");
});

app.put(`${endPointRoot}/post`, async (req, res) => {
  res.writeHead(statusCode.OK, {
    "Content-Type": "text/html",
    "Access-Control-Allow-Origin": "*",
  });
  const postid = req.query.postid;
  await incrementEndpointStats(`${endPointRoot}/post`, requestType.PUT);
  res.status(statusCode.OK).end(`Successfully updated post with id ${postid}`);
});

app.listen(port, () => {
  console.log("Connected! Waiting for request on port", port);
});
