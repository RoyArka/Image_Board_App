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
app.use("/documentation", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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

//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////

const locationSQL = require("../Back-End/sql/location-queries");
const statisticsSQL = require("../Back-End/sql/stat-queries");
const statusCode = require("../Back-End/http/status-codes");
const requestType = require("../Back-End/http/request-types");

const { createLocation, selectAllFromLocation } = locationSQL;
const { incrementEndpointStats, selectAllFromStats } = statisticsSQL;
const endPointRoot = "/4537/termproject/API/V1";

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
