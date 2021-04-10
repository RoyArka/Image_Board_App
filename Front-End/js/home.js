//Home Page functions
/* eslint-disable no-unused-vars */
const isProduction = () => {
  return !document.URL.includes("localhost");
};

const DELETE = "DELETE";
const endPointRoot = isProduction()
  ? "https://michealozdoba.com/4537/termproject/API/V1"
  : "4537/termproject/API/V1";

const GET = "GET";
const HTTP_STATUS_CODE_CONFLICT = 409;
const HTTP_STATUS_CODE_OK = 200;
const HTTP_STATUS_CODE_CREATED = 201;
const POST = "POST";
const PUT = "PUT";
const xhttp = new XMLHttpRequest();
const AUTHBEARER = "Bearer ";

//Creates div around each location link
const createDiv = (inputLocation) => {
  const div = document.createElement("div");
  div.setAttribute("id", inputLocation)
  return div;
};

//Creates title link for locations
const createLocTitle = (inputLocation) => {
  const locTitle = document.createElement("h4");
  locTitle.innerHTML = inputLocation;
  locTitle.setAttribute("id", inputLocation);
  locTitle.setAttribute("onclick", "setLocationID(this.id)");
  locTitle.setAttribute("class", "d-inline-flex");
  return locTitle;
};

//Creates anchor link for header
const createLink = (location) => {
  const link = document.createElement("a");
  link.setAttribute("href", "location");
  return link;
};

//Grab location id
const setLocationID = (locationId) => {
  console.log(locationId);
  localStorage.setItem("location-id", locationId);
};

//Creates delete button for location
const createDeleteButton = (inputLocation) => {
  const button = document.createElement("button");
  button.setAttribute("id", inputLocation);
  button.setAttribute("class", "btn btn-sm btn-outline-danger delete-button hide");
  button.setAttribute("onclick", "handleDelete(this.id)");
  button.innerHTML = "Delete";
  return button;
};

//Creates Location Block
const createLocation = () => {
  //Call POST function
  locationPost();
};

//Grabs valid token stored in local storage.
const getTokenLS = () => {
  const token = localStorage.getItem("token");
  const authValue = AUTHBEARER + token;
  return authValue;
};

//AJAX Location POST
const locationPost = () => {
  const locationValue = document.getElementById("inputLocation").value;
  const data = JSON.stringify({
    location: locationValue,
  });

  xhttp.open(POST, `${endPointRoot}/location`, true);
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.setRequestHeader("Authorization", getTokenLS());
  xhttp.setRequestHeader("Accept", "text/html");
  xhttp.send(data);

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == HTTP_STATUS_CODE_CREATED) {
      const response = JSON.parse(this.response);
      if (response.affectedRows === 0) {
        renderResponse(`${locationValue} already exists`, false);
        return;
      }
      renderResponse(`${locationValue} successfully added`, true);

      //root location for appending locations
      const root = document.getElementById("rootLocations");
      //Grabing location from input
      const inputLocation = document.getElementById("inputLocation").value;
      //Location Div
      const div = createDiv(inputLocation);
      //Location title
      const locTitle = createLocTitle(inputLocation);
      //Link for locations
      const link = createLink(inputLocation);
      //Delete Button
      const deleteButton = createDeleteButton(inputLocation);
      //appending elements
      root.appendChild(div);
      div.append(link);
      link.appendChild(locTitle);
      div.appendChild(deleteButton);
    }
  };
};

//AJAX Location GET
const locationGet = () => {
  xhttp.open(GET, `${endPointRoot}/location`, true);
  xhttp.setRequestHeader("Authorization", getTokenLS());
  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == HTTP_STATUS_CODE_OK) {
      const rootLocations = document.getElementById("rootLocations");
      const locationsResponse = JSON.parse(this.response).data;
      console.log(locationsResponse);
      locationsResponse.forEach((location) => {
        const div = createDiv(location.Name);
        const link = createLink(location.Name);
        const locTitle = createLocTitle(location.Name);
        const deleteButton = createDeleteButton(location.Name);
        rootLocations.appendChild(div);
        div.append(link);
        link.appendChild(locTitle);
        div.appendChild(deleteButton);
      });
    }
  };
};

const renderResponse = (message, isSuccess) => {
  const responseMessage = document.getElementById("response-message");
  responseMessage.innerHTML = message;

  if (isSuccess) {
    responseMessage.classList.add("response-success");
    responseMessage.classList.remove("hide");

    setTimeout(() => {
      responseMessage.classList.add("hide");
      responseMessage.classList.remove("response-success");
    }, 2000);
    return;
  }

  responseMessage.classList.add("response-error");
  responseMessage.classList.remove("hide");

  setTimeout(() => {
    responseMessage.classList.add("hide");
    responseMessage.classList.remove("response-error");
  }, 2000);
};

const handleEdit = () => {
  const editButton = document.getElementById("edit-button");

  const elements = document.getElementsByClassName("delete-button");
  if (editButton.innerHTML === "Edit") {
    editButton.innerHTML = "Done Editing";
    editButton.setAttribute("class", "btn btn-outline-success");
    console.log(elements);

    for (let i = 0, len = elements.length; i < len; i++) {
      elements[i].classList.remove("hide");
    }

    return;
  }
  editButton.innerHTML = "Edit";
  editButton.setAttribute("class", "btn btn-outline-warning");

  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].classList.add("hide");
  }
};

//AJAX Location Delete
const deleteLocation = (location) => {
  const xhttp2 = new XMLHttpRequest();
  xhttp2.open(DELETE, `${endPointRoot}/location/${location}`, true);
  xhttp2.setRequestHeader("Content-Type", "application/json");
  xhttp2.setRequestHeader("Authorization", getTokenLS());
  xhttp2.send();

  xhttp2.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == HTTP_STATUS_CODE_OK) {
      document.getElementById(location).remove();
    }
  };
};

//AJAX Location posts
const getLocationPosts = (location) => {
  xhttp.open(GET, `${endPointRoot}/location/${location}`);
  xhttp.setRequestHeader("Authorization", getTokenLS());
  xhttp.send();

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == HTTP_STATUS_CODE_OK) {
      const response = JSON.parse(this.response).data;
      console.log(response);
      if (response.length === 0) {
        // No posts for location can delete
        deleteLocation(location);
      }
    }
  };
};

//Handles Delete of location
const handleDelete = (location) => {
  getLocationPosts(location);
};
