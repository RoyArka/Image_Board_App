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

//Creates title link for locations
const createLocTitle = (inputLocation) => {
  const locTitle = document.createElement("h4");
  locTitle.innerHTML = inputLocation;
  locTitle.setAttribute("id", inputLocation);
  locTitle.setAttribute("onclick", "setLocationID(this.id)");
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

//Creates Location Block
const createLocation = () => {
  //root location for appending locations
  const root = document.getElementById("rootLocations");
  //Grabing location from input
  const inputLocation = document.getElementById("inputLocation").value;
  //Location title
  const locTitle = createLocTitle(inputLocation);
  //Link for locations
  const link = createLink(inputLocation);
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

  const stubbedResponse = `[{"Name":"Tokyo"}, {"Name":"Toronto"}, {"Name":"Paris"}]`;
  const rootLocations = document.getElementById("rootLocations");
  const locationsResponse = JSON.parse(stubbedResponse);

  locationsResponse.forEach((location) => {
    const link = createLink(location.Name);
    const locTitle = createLocTitle(location.Name);
    rootLocations.appendChild(link);
    link.appendChild(locTitle);
  });
};
