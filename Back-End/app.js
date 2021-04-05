const cors = require("cors");
const express = require("express");
const swaggerUi = require("swagger-ui-express");

const locationSQL = require("./sql/location-queries");
const statisticsSQL = require("./sql/stat-queries");
const statusCode = require("./http/status-codes");
const swaggerDocument = require("../swagger.json");
const requestType = require("./http/request-types");
const userSQL = require("./sql/user-queries");

const { createLocation, selectAllFromLocation } = locationSQL;
const { incrementEndpointStats, selectAllFromStats } = statisticsSQL;
const {
  getUserById,
  registerUser,
  updatePasswordByUserId,
  updateUsernameByUserId,
} = userSQL;
const app = express();
const crossOrigin = "https://comp4537-project.herokuapp.com";
const endPointRoot = "/4537/termproject/API/V1";
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("Back-End"));
// app.use(express.static("./"));
app.use("/documentation", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.delete(`${endPointRoot}/location`, async (req, res) => {
  res.writeHead(statusCode.OK, {
    "Content-Type": "text/html",
    "Access-Control-Allow-Origin": crossOrigin,
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
    "Access-Control-Allow-Origin": crossOrigin,
  });
  const postId = req.query.id;
  res.status(statusCode.OK).end(`Successfully deleted post with id ${postId}`);
});

app.get(`${endPointRoot}/location/:location`, async (req, res) => {
  res.writeHead(statusCode.OK, {
    "Content-Type": "text/html",
    "Access-Control-Allow-Origin": crossOrigin,
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
    "Access-Control-Allow-Origin": crossOrigin,
  });

  const selectAllResponse = await selectAllFromLocation();
  console.log(selectAllResponse);
  await incrementEndpointStats(`${endPointRoot}/location`, requestType.GET);

  res.end(JSON.stringify(selectAllResponse));
});

app.get(`${endPointRoot}/stats`, async (req, res) => {
  res.writeHead(statusCode.OK, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": crossOrigin,
  });

  const selectAllResponse = await selectAllFromStats();
  await incrementEndpointStats(`${endPointRoot}/stats`, requestType.GET);

  res.end(JSON.stringify(selectAllResponse));
});

app.get(`${endPointRoot}/user/:id`, async (req, res) => {
  res.writeHead(statusCode.OK, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": crossOrigin,
  });
  const getUserByIdResponse = await getUserById(req.params.id);
  await incrementEndpointStats(`${endPointRoot}/user/:id`, requestType.GET);

  res.end(JSON.stringify(getUserByIdResponse));
});

app.post(`${endPointRoot}/login`, async (req, res) => {
  res.writeHead(statusCode.CREATED, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": crossOrigin,
  });
  res.status(statusCode.CREATED).end("Successful Login/Register");
});

app.post(`${endPointRoot}/location`, async (req, res) => {
  res.writeHead(statusCode.CREATED, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": crossOrigin,
  });
  const createLocationResponse = await createLocation(req.body.location);
  await incrementEndpointStats(`${endPointRoot}/location`, requestType.POST);

  res.status(statusCode.CREATED).end(JSON.stringify(createLocationResponse));
});

app.post(`${endPointRoot}/post`, async (req, res) => {
  res.writeHead(statusCode.CREATED, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": crossOrigin,
  });

  const incrementEndpointResponse = await incrementEndpointStats(
    `${endPointRoot}/post`,
    requestType.POST,
  );
  res.status(statusCode.CREATED).end(JSON.stringify(incrementEndpointResponse));
});

app.post(`${endPointRoot}/register`, async (req, res) => {
  res.writeHead(statusCode.CREATED, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": crossOrigin,
  });
  const { isAdmin, password, username } = req.body;
  const dateJoined = new Date().getTime();

  const registerUserResponse = await registerUser({
    dateJoined,
    isAdmin,
    password,
    username,
  });
  res.status(statusCode.CREATED).end(JSON.stringify(registerUserResponse));
});

app.put(`${endPointRoot}/user/:id`, async (req, res) => {
  const { password, username } = req.body;
  const id = req.params.id;

  let updateUserByIdResponse;
  if (username) {
    updateUserByIdResponse = await updateUsernameByUserId({
      id,
      username,
    });
  } else {
    //TODO: hash the password before inserting
    updateUserByIdResponse = await updatePasswordByUserId({
      id,
      password,
    });
  }
  await incrementEndpointStats(`${endPointRoot}/user:id`, requestType.PUT);

  res.writeHead(statusCode.OK, {
    "Content-Type": "text/html",
    "Access-Control-Allow-Origin": crossOrigin,
  });
  res.status(statusCode.OK).end(JSON.stringify(updateUserByIdResponse));
});

app.put(`${endPointRoot}/post`, async (req, res) => {
  res.writeHead(statusCode.OK, {
    "Content-Type": "text/html",
    "Access-Control-Allow-Origin": crossOrigin,
  });
  const postid = req.params.postid;
  await incrementEndpointStats(`${endPointRoot}/post`, requestType.PUT);
  res.status(statusCode.OK).end(`Successfully updated post with id ${postid}`);
});

app.listen(port, () => {
  console.log("Connected! Waiting for request on port", port);
});
