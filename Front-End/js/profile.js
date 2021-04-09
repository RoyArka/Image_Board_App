/* eslint-disable no-unused-vars */
const isProduction = () => {
  return !document.URL.includes("localhost");
};

const DELETE = "DELETE";
const endPointRoot = isProduction()
  ? "https://michealozdoba.com/4537/termproject/API/V1"
  : "4537/termproject/API/V1";
const imageServingRoot = isProduction()
  ? "https://michealozdoba.com/4537/termproject"
  : "http://localhost:3000";
const GET = "GET";
const HTTP_STATUS_CODE_CONFLICT = 409;
const HTTP_STATUS_CODE_OK = 200;
const POST = "POST";
const PUT = "PUT";
const AUTHBEARER = "Bearer ";

const createRowPassword = (password) => {
  const divHeader = document.getElementById("row-header-password");

  const div = document.createElement("div");
  div.setAttribute("class", "col-sm-5 text-secondary");
  div.setAttribute("id", "row-password");
  div.innerHTML = password;

  const button = document.createElement("button");
  button.setAttribute("class", "col-sm-2 btn btn-sm btn-outline-primary");
  button.setAttribute("id", "row-password-btn");
  button.setAttribute("onclick", "handleChangePassword()");
  button.innerHTML = "Change";

  divHeader.append(div);
  divHeader.append(button);

  return divHeader;
};

const createRowPasswordEditable = () => {
  const div = document.getElementById("row-header-password");

  const input = document.createElement("input");
  input.setAttribute("class", "col-sm-5 form-control");
  input.setAttribute("id", "row-password-input");
  input.setAttribute("placeholder", "New Password");
  input.setAttribute("type", "password");

  const button = document.createElement("button");
  button.setAttribute("class", "col-sm-2 btn btn-sm btn-success");
  button.setAttribute("id", "row-password-btn-editable");
  button.setAttribute("onclick", "handleDoneChangePassword()");
  button.innerHTML = "Done";

  div.append(input);
  div.append(button);

  return div;
};

const createRowUsername = (username) => {
  const divHeader = document.getElementById("row-header-username");

  const div = document.createElement("div");
  div.setAttribute("class", "col-sm-5 text-secondary");
  div.setAttribute("id", "row-username");
  div.innerHTML = username;

  const button = document.createElement("button");
  button.setAttribute("class", "col-sm-2 btn btn-sm btn-outline-primary");
  button.setAttribute("id", "row-username-btn");
  button.setAttribute("onclick", "handleChangeUsername()");
  button.innerHTML = "Change";

  divHeader.append(div);
  divHeader.append(button);

  return divHeader;
};

const createRowUsernameEditable = () => {
  const div = document.getElementById("row-header-username");

  const input = document.createElement("input");
  input.setAttribute("class", "col-sm-5 form-control");
  input.setAttribute("id", "row-username-input");
  input.setAttribute("placeholder", "New Username");
  input.setAttribute("type", "text");

  const button = document.createElement("button");
  button.setAttribute("class", "col-sm-2 btn btn-sm btn-success");
  button.setAttribute("id", "row-username-btn-editable");
  button.setAttribute("onclick", "handleDoneChangeUsername()");
  button.innerHTML = "Done";

  div.append(input);
  div.append(button);

  return div;
};

const handleDoneChangePassword = () => {
  const newPassword = document.getElementById("row-password-input").value;
  let maskedPassword = "";
  for (let i = 0; i < newPassword.length; i++) {
    maskedPassword += "*";
  }

  document.getElementById("row-password-input").remove();
  document.getElementById("row-password-btn-editable").remove();

  updateUserPassword(newPassword);
  createRowPassword(maskedPassword);
};

const handleChangePassword = () => {
  document.getElementById("row-password").remove();
  document.getElementById("row-password-btn").remove();

  createRowPasswordEditable();
};

const handleDoneChangeUsername = () => {
  const newUsername = document.getElementById("row-username-input").value;

  document.getElementById("row-username-input").remove();
  document.getElementById("row-username-btn-editable").remove();

  updateUserUsername(newUsername);
  createRowUsername(newUsername);
};

const handleChangeUsername = () => {
  document.getElementById("row-username").remove();
  document.getElementById("row-username-btn").remove();

  createRowUsernameEditable();
};

const loadProfile = () => {
  const xhttp = new XMLHttpRequest();
  const id = localStorage.getItem("user-id");
  xhttp.open(GET, `${endPointRoot}/user/${id}`, true);
  xhttp.setRequestHeader("Authorization", getTokenLS());
  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == HTTP_STATUS_CODE_OK) {
      const response = JSON.parse(this.response);
      const { Admin, DateJoined, Username } = response[0];

      const rowDateJoined = document.getElementById("row-date-joined");
      rowDateJoined.innerHTML = new Date(DateJoined).toDateString();

      const cardUsername = document.getElementById("card-username");
      cardUsername.innerHTML = Username;

      const rowMemberType = document.getElementById("row-member-type");
      rowMemberType.innerHTML = Admin === 1 ? "Admin" : "Member";

      const rowUsername = document.getElementById("row-username");
      rowUsername.innerHTML = Username;

      loadPosts(Username);
    }
  };
};

const loadPosts = (username) => {
  const xhttp = new XMLHttpRequest();
  xhttp.open(GET, `${endPointRoot}/posts/${username}`);
  xhttp.setRequestHeader("Authorization", getTokenLS());
  xhttp.send();

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == HTTP_STATUS_CODE_OK) {
      const response = JSON.parse(this.response);
      console.log(response);
      if (response.length === 0) {
        // No posts for user... display message
        document.getElementById("posts-title").innerHTML = `You have no posts`;
        return;
      }

      response.forEach((post) => {
        createPost({
          imageSrc: post.ImagePath,
          message: post.Message,
          location: post.LocationName,
          postId: post.ID,
        });
      });
    }
  };
};

const createPost = ({ imageSrc, location, message, postId }) => {
  const rootPosts = document.getElementById("rootPosts");

  const divColumnPost = document.createElement("div");
  divColumnPost.setAttribute("class", "col-md-10 mb-3");
  divColumnPost.setAttribute("id", `post-id-${postId}`);

  const divCardMb3 = document.createElement("div");
  divColumnPost.setAttribute("class", "card mb-3");

  const cardBodyPost = document.createElement("div");
  cardBodyPost.setAttribute("class", "card-body");

  const divFlexPost = document.createElement("div");
  divFlexPost.setAttribute(
    "class",
    "d-flex flex-column align-items-center text-center",
  );

  // Create Location Div
  const divPostLocation = document.createElement("div");
  divPostLocation.setAttribute("class", "mt-3");
  divPostLocation.setAttribute("class", "post-location");
  divPostLocation.innerHTML = location;

  // Create Image Div
  const divPostImage = document.createElement("div");
  divPostImage.setAttribute("class", "mt-3");

  const imgElement = document.createElement("img");
  imgElement.setAttribute("class", "post-image");
  imgElement.setAttribute("src", `${imageServingRoot}${imageSrc}`);

  divPostImage.appendChild(imgElement);

  // Create Message Div
  const divPostMessage = document.createElement("div");
  divPostMessage.setAttribute("class", "mt-3");
  divPostMessage.setAttribute("class", "post-message");
  divPostMessage.innerHTML = message;

  // Create Div For Buttons
  const divFlexButtons = document.createElement("div");
  divFlexButtons.setAttribute(
    "class",
    "d-flex flex-row align-items-center text-center",
  );

  // Update Button
  const updateButton = document.createElement("button");
  updateButton.setAttribute(
    "class",
    "btn btn-lg btn-outline-info update-button",
  );
  updateButton.setAttribute("onclick", `updatePostById(${postId})`);
  updateButton.innerHTML = "Update";

  // Delete Button
  const deleteButton = document.createElement("button");
  deleteButton.setAttribute(
    "class",
    "btn btn-lg btn-outline-danger delete-button",
  );

  deleteButton.setAttribute("onclick", `deletePostById(${postId})`);
  deleteButton.innerHTML = "Delete";

  divColumnPost.appendChild(divCardMb3);
  divCardMb3.appendChild(cardBodyPost);

  divFlexPost.appendChild(divPostLocation);
  divFlexPost.appendChild(divPostImage);
  divFlexPost.appendChild(divPostMessage);
  divFlexPost.appendChild(divFlexButtons);
  divFlexButtons.appendChild(updateButton);
  divFlexButtons.appendChild(deleteButton);

  cardBodyPost.appendChild(divFlexPost);
  const hr = document.createElement("hr");

  rootPosts.appendChild(divColumnPost);
  rootPosts.append(hr);
};

const updateUserUsername = (username) => {
  const id = localStorage.getItem("user-id");

  const xhttp = new XMLHttpRequest();
  xhttp.open(PUT, `${endPointRoot}/user/${id}`, true);
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.setRequestHeader("Authorization", getTokenLS());

  const payload = { username: username };
  xhttp.send(JSON.stringify(payload));

  xhttp.onreadystatechange = function () {
    // TODO: sucessful username change
    if (this.readyState == 4 && this.status == HTTP_STATUS_CODE_OK) {
      const response = JSON.parse(this.response);
    }

    // TODO: client error (duplicate username) unsuccessful username change
    if (this.readyState == 4 && this.status == HTTP_STATUS_CODE_CONFLICT) {
      const response = JSON.parse(this.response);
    }

    // TODO: server error
    if (this.readyState == 4 && this.status == 200) {
      const response = JSON.parse(this.response);
    }
  };
};

const updateUserPassword = (password) => {
  const id = localStorage.getItem("user-id");

  const xhttp = new XMLHttpRequest();
  xhttp.open(PUT, `${endPointRoot}/user/${id}`, true);
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.setRequestHeader("Authorization", getTokenLS());

  const payload = { password: password };
  xhttp.send(JSON.stringify(payload));

  xhttp.onreadystatechange = function () {
    // TODO: successful password change
    if (this.readyState == 4 && this.status == HTTP_STATUS_CODE_OK) {
      const response = JSON.parse(this.response);
    }
  };
};

const deletePostById = (id) => {
  const xhttp = new XMLHttpRequest();
  xhttp.open(DELETE, `${endPointRoot}/post/${id}`, true);
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.setRequestHeader("Authorization", getTokenLS());
  xhttp.send();

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == HTTP_STATUS_CODE_OK) {
      const response = JSON.parse(this.response);
      console.log(response);

      document.getElementById(`post-id-${id}`).remove();
    }
  };
};

//Grabs valid token stored in local storage.
const getTokenLS = () => {
  const token = localStorage.getItem("token");
  const authValue = AUTHBEARER + token;
  return authValue;
};
