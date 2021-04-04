/* eslint-disable no-unused-vars */
//Home Page functions
const xhttp = new XMLHttpRequest();
const DELETE = "DELETE";
const GET = "GET";
const POST = "POST";
const PUT = "PUT";
const UPDATE = "UPDATE";
const endPointRoot = "/4537/termproject/API/V1";
const hostedEndPointRoot = "https://michealozdoba.com/4537/termproject/API/V1";

//Creates Div for locations
const createDiv = (inputLocation) => {
  const div = document.createElement("div");
  div.setAttribute("id", "div" + inputLocation);
  return div;
};

//Creates title for locations
const createLocTitle = (inputLocation) => {
  const locTitle = document.createElement("h4");
  locTitle.innerHTML = inputLocation;
  return locTitle;
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
const createLocation = (isOwner, myLocation, myCaption) => {
  //root location for appending locations
  const root = document.getElementById("rootLocations");
  //Grabing location from input
  const inputLocation = document.getElementById("inputLocation").value;
  //div creation for location block
  const div = createDiv(inputLocation);
  //Location title
  const locTitle = createLocTitle(inputLocation);

  //appending elements
  root.appendChild(locTitle);
  //Call POST function
  locationPost();
};

//AJAX Location POST
const locationPost = () => {
  const locationValue = document.getElementById("inputLocation").value;
  const data = JSON.stringify({
    location: locationValue,
  });

  xhttp.open(POST, `${hostedEndPointRoot}/location`, true);
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.setRequestHeader("Accept", "text/html");
  xhttp.send(data);

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.responseText);
    }
  };
};

//AJAX Location GET
const locationGet = () => {
  xhttp.open(GET, `${hostedEndPointRoot}/location`, true);
  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const rootLocations = document.getElementById("rootLocations");
      const locationsResponse = JSON.parse(this.response);

      locationsResponse.forEach((location) => {
        const locTitle = createLocTitle(location.Name);
        rootLocations.appendChild(locTitle);
      });
    }
  };
};
