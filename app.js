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
const responseMsg = require("./http/response-message");
const { response } = require("express");

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

//TODO: will need to change the response here once this is fully done
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
    deletePostByIdResponse.message = responseMsg.DEL_POST_SUCCESS;
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

  const properResponse = {
    message: responseMsg.GET_LOCATIONS_SUCCESS,
    data: selectAllResponse,
  };

  res.writeHead(statusCode.OK, {
    "Content-Type": "application/json",
  });
  res.end(JSON.stringify(properResponse));
});

app.get(`${endPointRoot}/stats`, checkAuth, async (req, res) => {
  const selectAllResponse = await selectAllFromStats();
  await incrementEndpointStats(`${endPointRoot}/stats`, requestType.GET);

  const properResponse = {
    message: responseMsg.GET_STATS_SUCCESS,
    response: selectAllResponse,
  };

  res.writeHead(statusCode.OK, {
    "Content-Type": "application/json",
  });
  res.end(JSON.stringify(properResponse));
});

app.get(`${endPointRoot}/user/:id`, checkAuth, async (req, res) => {
  const getUserByIdResponse = await getUserById(req.params.id);
  await incrementEndpointStats(`${endPointRoot}/user/:id`, requestType.GET);

  res.writeHead(statusCode.OK, {
    "Content-Type": "application/json",
  });

  const properResponse = {
    message: responseMsg.GET_USER_SUCCESS,
    response: getUserByIdResponse,
  };

  res.end(JSON.stringify(properResponse));
});

app.post(`${endPointRoot}/location`, checkAuth, async (req, res) => {
  const createLocationResponse = await createLocation(req.body.location);
  await incrementEndpointStats(`${endPointRoot}/location`, requestType.POST);
  console.log("CREATE LOCATION RESPONSE", createLocationResponse);
  createLocationResponse.message = responseMsg.LOCATION_SUCCESS;
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

  const createLocationResponse = await createLocation(locationName);

  console.log("CREATE LOCATION RESPONSE", createLocationResponse);
  console.log("GET USER BY ID RESPONSE", getUserByIdResponse);
  console.log("CREATE POST RESPONSE", createPostResponse);

  createPostResponse.message = responseMsg.POST_SUCCESS;
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

  const invalidPassRes = {
    message: responseMsg.INCORRECT_PASSWORD,
    response: getUserByUsernameResponse,
  };

  const invalidUserRes = {
    message: responseMsg.INCORRECT_USERNAME,
    response: getUserByUsernameResponse,
  };

  if (!userData) {
    // TODO: handle invalid username
    console.log("Incorrect Credentials");
    res
      .status(statusCode.HTTP_STATUS_CODE_CONFLICT)
      .end(JSON.stringify(invalidUserRes));
    return;
  }

  const correctCredentials = await comparePasswords(
    password,
    userData.Password,
  );

  if (!correctCredentials) {
    //TODO: handle incorrect credentials
    console.log("Incorrect Credentials");
    res
      .status(statusCode.HTTP_STATUS_CODE_CONFLICT)
      .end(JSON.stringify(invalidPassRes));
    return;
  }

  //Creating token for user
  const token = createToken(username, userData.ID);
  getUserByUsernameResponse[0].Token = token;
  getUserByUsernameResponse[0].message = responseMsg.LOGIN_SUCCESS;

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

  if (registerUserResponse.code === "ER_DUP_ENTRY") {
    registerUserResponse.message = responseMsg.DUPLICATE_ENTRY_ERROR;
    res.writeHead(statusCode.HTTP_STATUS_CODE_CONFLICT, {
      "Content-Type": "application/json",
    });
    res.end(JSON.stringify(registerUserResponse));
    return;
  }

  //Creating token for user
  const token = createToken(username, registerUserResponse.insertId);
  registerUserResponse.token = token;
  registerUserResponse.message = responseMsg.REGISTER_SUCCESS;
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

    if (updateUserByIdResponse.code === "ER_DUP_ENTRY") {
      updateUserByIdResponse.message = responseMsg.DUPLICATE_ENTRY_ERROR;
      res.writeHead(statusCode.HTTP_STATUS_CODE_CONFLICT, {
        "Content-Type": "application/json",
      });
      res.end(JSON.stringify(updateUserByIdResponse));
    }
  }
  if (password) {
    updateUserByIdResponse = await updatePasswordByUserId({
      id,
      password: await hashPassword(password),
    });
  }
  console.log(updateUserByIdResponse);
  await incrementEndpointStats(`${endPointRoot}/user:id`, requestType.PUT);

  updateUserByIdResponse.message = responseMsg.PUT_USER_SUCCESS;

  res.writeHead(statusCode.OK, {
    "Content-Type": "application/json",
  });
  res.status(statusCode.OK).end(JSON.stringify(updateUserByIdResponse));
});

app.put(`${endPointRoot}/post`, checkAuth, async (req, res) => {
  const { id, message } = req.body;

  let updatePostByIdResponse = await updatePostById(id, message);
  await incrementEndpointStats(`${endPointRoot}/post`, requestType.PUT);

  console.log("UPDATE POST BY ID RESPONSE", updatePostByIdResponse);
  updatePostByIdResponse = responseMsg.PUT_POST_SUCCESS;

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
