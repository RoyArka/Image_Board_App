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
const POST = "POST";
const PUT = "PUT";
const xhttp = new XMLHttpRequest();

//Creates Div for locations
const createDiv = (inputLocation) => {
  const div = document.createElement("div");
  div.setAttribute("id", "div" + inputLocation);
  return div;
};

//Creates title link for locations
const createLocTitle = (inputLocation) => {
  const locTitle = document.createElement("h4");
  locTitle.innerHTML = inputLocation;
  locTitle.setAttribute("id", inputLocation);
  return locTitle;
};

//Creates a link for header
const createLink = () => {
  const link = document.createElement("a");
  link.setAttribute("href", "location");
  return link;
};

//Creates Caption title
const createCapTitle = () => {
  const captionTitle = document.createElement("p");
  captionTitle.innerHTML = "<h6>Caption:</h6>";
  return captionTitle;
};

//Creates input for caption
const createCapInput = (inputLocation, myCaption) => {
  const captionInput = document.createElement("input");
  captionInput.setAttribute("type", "text");
  captionInput.setAttribute("id", "captionInput" + inputLocation);
  captionInput.value = myCaption;
  return captionInput;
};

//Creates image title
const createImgTitle = () => {
  const imgTitle = document.createElement("p");
  imgTitle.innerHTML = "<h6>Image:</h6>";
  return imgTitle;
};

//Creates input for image
const createImgInput = (inputLocation) => {
  const imgInput = document.createElement("input");
  imgInput.setAttribute("type", "file");
  imgInput.setAttribute("name", "image");
  imgInput.setAttribute("accept", "image/*");
  imgInput.setAttribute("id", "imgInput" + inputLocation);
  return imgInput;
};

//Creates Post creation button
const createPostButton = (inputLocation) => {
  const postButton = document.createElement("button");
  postButton.innerHTML = "Post";
  postButton.setAttribute("id", "postButton" + inputLocation);
  return postButton;
};

//Creates Delete location button
const createDeleteButton = (inputLocation) => {
  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = "Delete Location";
  deleteButton.setAttribute("id", "deleteButton" + inputLocation);
  return deleteButton;
};

//Creates Location Block
const createLocation = () => {
  //root location for appending locations
  const root = document.getElementById("rootLocations");
  //Grabing location from input
  const inputLocation = document.getElementById("inputLocation").value;
  //Location title
  const locTitle = createLocTitle(inputLocation);
  //Link for locations
  const link = createLink();
  //appending elements
  root.appendChild(link);
  link.append(locTitle);
  //Call POST function
  locationPost();
};

//AJAX Location POST
const locationPost = () => {
  const locationValue = document.getElementById("inputLocation").value;
  const data = JSON.stringify({
    location: locationValue,
  });

  xhttp.open(POST, `${endPointRoot}/location`, true);
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.setRequestHeader("Accept", "text/html");
  xhttp.send(data);

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == HTTP_STATUS_CODE_OK) {
      console.log(this.responseText);
    }
  };
};

//AJAX Location GET
const locationGet = () => {
  // xhttp.open(GET, `${endPointRoot}/location`, true);
  // xhttp.send();
  // xhttp.onreadystatechange = function () {
  //   if (this.readyState == 4 && this.status == HTTP_STATUS_CODE_OK) {
  //     const rootLocations = document.getElementById("rootLocations");
  //     const locationsResponse = JSON.parse(this.response);

  //     locationsResponse.forEach((location) => {
  //       const locTitle = createLocTitle(location.Name);
  //       rootLocations.appendChild(locTitle);
  //     });
  //   }

  const stubbedResponse = `[{"Name":"Tokyo"}]`;
  const rootLocations = document.getElementById("rootLocations");
  const locationsResponse = JSON.parse(stubbedResponse);

  locationsResponse.forEach((location) => {
    const link = createLink();
    const locTitle = createLocTitle(location.Name);
    rootLocations.appendChild(link);
    link.appendChild(locTitle);
  });
};
