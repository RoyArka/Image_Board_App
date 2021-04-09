const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const swaggerUi = require("swagger-ui-express");

const locationSQL = require("./sql/location-queries");
const { comparePasswords, hashPassword } = require("./util/hash-password");
const {
  createPost,
  deletePostById,
  getPostsByLocationName,
  getPostsByUsername,
  updatePostById,
} = require("./sql/post-queries");
const statisticsSQL = require("./sql/stat-queries");
const statusCode = require("./http/status-codes");
const swaggerDocument = require("./swagger.json");
const requestType = require("./http/request-types");
const userSQL = require("./sql/user-queries");
const { writeFileToPath } = require("./util/image-utils");
const { createToken } = require("./util/auth-token");
const checkAuth = require("./util/check-auth");

const { createLocation, selectAllFromLocation } = locationSQL;
const { incrementEndpointStats, selectAllFromStats } = statisticsSQL;
const {
  getUserById,
  getUserByUsername,
  registerUser,
  updatePasswordByUserId,
  updateUsernameByUserId,
} = userSQL;

const app = express();
const crossOrigin = "https://comp4537-project.herokuapp.com";
const endPointRoot = "/4537/termproject/API/V1";
const corsOptions = {
  origin: crossOrigin,
};
const port = process.env.PORT || 3000;

// app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("Front-End"));
app.use("/images", express.static(__dirname + "/images"));
// app.use(express.static("./"));
app.use(
  "/documentation.html",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument),
);

app.delete(`${endPointRoot}/location/:id`, checkAuth, async (req, res) => {
  const location = req.params.location;

  await incrementEndpointStats(`${endPointRoot}/location`, requestType.DELETE);
  res.writeHead(statusCode.OK, {
    "Content-Type": "text/html",
  });
  res
    .status(statusCode.OK)
    .end(`Successfully deleted location with name ${location}`);
});

app.delete(`${endPointRoot}/post/:id`, checkAuth, async (req, res) => {
  const deletePostByIdResponse = await deletePostById(req.params.id);

  console.log(deletePostByIdResponse);

  res.writeHead(statusCode.OK, {
    "Content-Type": "application/json",
  });

  if (deletePostByIdResponse.affectedRows === 1) {
    deletePostByIdResponse.message = "Delete Success";
  }

  res.end(JSON.stringify(deletePostByIdResponse));
});

app.get(`${endPointRoot}/location/:location`, checkAuth, async (req, res) => {
  const getPostsByLocationNameResponse = await getPostsByLocationName(
    req.params.location,
  );

  await incrementEndpointStats(`${endPointRoot}/post`, requestType.GET);

  res.writeHead(statusCode.OK, {
    "Content-Type": "application/json",
  });
  res.end(JSON.stringify(getPostsByLocationNameResponse));
});

app.get(`${endPointRoot}/posts/:username`, checkAuth, async (req, res) => {
  const username = req.params.username;
  const getPostsByUsernameResponse = await getPostsByUsername(username);
  console.log(getPostsByUsernameResponse);
  res.writeHead(statusCode.OK, {
    "Content-Type": "application/json",
  });
  res.end(JSON.stringify(getPostsByUsernameResponse));
});

app.get(`${endPointRoot}/location`, checkAuth, async (req, res) => {
  const selectAllResponse = await selectAllFromLocation();
  console.log(selectAllResponse);
  await incrementEndpointStats(`${endPointRoot}/location`, requestType.GET);

  res.writeHead(statusCode.OK, {
    "Content-Type": "application/json",
  });
  res.end(JSON.stringify(selectAllResponse));
});

app.get(`${endPointRoot}/stats`, checkAuth, async (req, res) => {
  const selectAllResponse = await selectAllFromStats();
  await incrementEndpointStats(`${endPointRoot}/stats`, requestType.GET);

  res.writeHead(statusCode.OK, {
    "Content-Type": "application/json",
  });
  res.end(JSON.stringify(selectAllResponse));
});

app.get(`${endPointRoot}/user/:id`, checkAuth, async (req, res) => {
  const getUserByIdResponse = await getUserById(req.params.id);
  await incrementEndpointStats(`${endPointRoot}/user/:id`, requestType.GET);

  res.writeHead(statusCode.OK, {
    "Content-Type": "application/json",
  });

  res.end(JSON.stringify(getUserByIdResponse));
});

app.post(`${endPointRoot}/location`, checkAuth, async (req, res) => {
  const createLocationResponse = await createLocation(req.body.location);
  await incrementEndpointStats(`${endPointRoot}/location`, requestType.POST);

  res.writeHead(statusCode.CREATED, {
    "Content-Type": "application/json",
  });
  res.status(statusCode.CREATED).end(JSON.stringify(createLocationResponse));
});

app.post(`${endPointRoot}/post`, checkAuth, async (req, res) => {
  const { fileSrc, filename, locationName, message, userId } = req.body;
  const absoluteFilePath = `${__dirname}/images/${filename}`;
  const relativeFilePath = `/images/${filename}`;

  writeFileToPath(fileSrc, absoluteFilePath);
  const getUserByIdResponse = await getUserById(userId);
  console.log(getUserByIdResponse);
  const createPostResponse = await createPost({
    username: getUserByIdResponse[0].Username,
    imagePath: relativeFilePath,
    locationName,
    message,
  });

  await incrementEndpointStats(`${endPointRoot}/post`, requestType.POST);

  res.writeHead(statusCode.CREATED, {
    "Content-Type": "application/json",
  });
  res.status(statusCode.CREATED).end(JSON.stringify(createPostResponse));
});

app.post(`${endPointRoot}/login`, async (req, res) => {
  const { password, username } = req.body;
  const getUserByUsernameResponse = await getUserByUsername(username);
  const userData = getUserByUsernameResponse[0];
  if (!userData) {
    // TODO: handle invalid username
    return;
  }

  const correctCredentials = await comparePasswords(
    password,
    userData.Password,
  );

  if (!correctCredentials) {
    //TODO: handle incorrect credentials
    console.log("Incorrect Credentials");
    res.status(409).end(JSON.stringify(getUserByUsernameResponse));
    return;
  }

  //Creating token for user
  const token = createToken(username, userData.ID);
  getUserByUsernameResponse[0].Token = token;

  res.writeHead(statusCode.OK, {
    "Content-Type": "application/json",
  });
  res.status(statusCode.OK).end(JSON.stringify(getUserByUsernameResponse));
});

app.post(`${endPointRoot}/register`, async (req, res) => {
  const { isAdmin, password, username } = req.body;
  const dateJoined = new Date().getTime();

  const registerUserResponse = await registerUser({
    dateJoined,
    isAdmin,
    password: await hashPassword(password),
    username,
  });

  res.writeHead(statusCode.CREATED, {
    "Content-Type": "application/json",
  });
  res.status(statusCode.CREATED).end(JSON.stringify(registerUserResponse));
});

app.put(`${endPointRoot}/user/:id`, checkAuth, async (req, res) => {
  const { password, username } = req.body;
  const id = req.params.id;
  let updateUserByIdResponse;
  if (username) {
    updateUserByIdResponse = await updateUsernameByUserId({
      id,
      username,
    });
  }
  if (password) {
    updateUserByIdResponse = await updatePasswordByUserId({
      id,
      password: await hashPassword(password),
    });
  }
  console.log(updateUserByIdResponse);
  await incrementEndpointStats(`${endPointRoot}/user:id`, requestType.PUT);

  res.writeHead(statusCode.OK, {
    "Content-Type": "application/json",
  });
  res.status(statusCode.OK).end(JSON.stringify(updateUserByIdResponse));
});

app.put(`${endPointRoot}/post`, checkAuth, async (req, res) => {
  const { id, message } = req.body;
  const updatePostByIdResponse = await updatePostById(id, message);
  await incrementEndpointStats(`${endPointRoot}/post`, requestType.PUT);

  res.writeHead(statusCode.OK, {
    "Content-Type": "application/json",
  });
  res.end(JSON.stringify(updatePostByIdResponse));
});

app.listen(port, () => {
  console.log("Connected! Waiting for request on port", port);
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////

//documentation page
app.get("/doc", (req, res) => {
  res.sendFile(__dirname + "/Front-End/documentation.html");
});

//home page
app.get("/home", (req, res) => {
  res.sendFile(__dirname + "/Front-End/home.html");
});

//login page
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/Front-End/login.html");
});

//profile page
app.get("/profile", (req, res) => {
  res.sendFile(__dirname + "/Front-End/profile.html");
});

//register page
app.get("/register", (req, res) => {
  res.sendFile(__dirname + "/Front-End/register.html");
});

//stats page for requests
app.get("/stats", (req, res) => {
  res.sendFile(__dirname + "/Front-End/admin.html");
});

//location page
app.get("/location", (req, res) => {
  res.sendFile(__dirname + "/Front-End/location.html");
});

//logsout to login page
app.get("/logout", (req, res) => {
  res.sendFile(__dirname + "/Front-End/login.html");
});

//location page
app.get("/post", (req, res) => {
  res.sendFile(__dirname + "/Front-End/post.html");
});
