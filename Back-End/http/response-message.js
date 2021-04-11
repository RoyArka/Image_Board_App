//DELETE success messages
const DEL_LOCATION_SUCCESS = "Successfully deleted location with name";
const DEL_POST_SUCCESS = "Successfully deleted post with id";

//DELETE fail messages
const DEL_LOCATION_ERROR = "Failed to delete location with name";
const DEL_POST_ERROR = "Failed to delete post with id";

//GET success messages
const GET_POSTS_SUCCESS = "Successfully fetched all posts for location";
const GET_LOCATIONS_SUCCESS = "Succesfully fetched all locations";
const GET_USER_SUCCESS = "Successfully fetched user information";
const GET_STATS_SUCCESS = "Successfully fetched stats for all endpoints";

//POST success messages
const LOGIN_SUCCESS = "Login Successful";
const REGISTER_SUCCESS = "Registration Successful";
const POST_SUCCESS = "Successfully created a Post";
const LOCATION_SUCCESS = "Successfully created a Location";

//POST error messages
const DUPLICATE_ENTRY_ERROR = "Duplicate entry for username";

//login fail messages
const INCORRECT_USERNAME = "Login Failed, incorrect username";
const INCORRECT_PASSWORD = "Login Failed, incorrect password";
const FORBIDDEN_ACCESS =
  "Forbidden Access, you must be an admin to access this resource";

//PUT sucess messages
const PUT_USER_SUCCESS = "Successfully updated user information";
const PUT_POST_SUCCESS = "Successfully updated post message";

module.exports = {
  DEL_LOCATION_SUCCESS,
  DEL_LOCATION_ERROR,
  DEL_POST_SUCCESS,
  DEL_POST_ERROR,
  DUPLICATE_ENTRY_ERROR,
  FORBIDDEN_ACCESS,
  GET_POSTS_SUCCESS,
  GET_LOCATIONS_SUCCESS,
  GET_USER_SUCCESS,
  GET_STATS_SUCCESS,
  INCORRECT_USERNAME,
  INCORRECT_PASSWORD,
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
  POST_SUCCESS,
  LOCATION_SUCCESS,
  PUT_USER_SUCCESS,
  PUT_POST_SUCCESS,
};
