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

const theImageForm = document.getElementById("theImageForm");
const theImageField = document.getElementById("theImageField");
const theImageContainer = document.getElementById("theImageContainer");
const theErrorMessage = document.getElementById("errorMessage");
const theSuccessMessage = document.getElementById("successMessage");
const theClearImageLink = document.getElementById("clearImage");

let fileName = "";

[
  "drag",
  "dragstart",
  "dragend",
  "dragover",
  "dragenter",
  "dragleave",
  "drop",
].forEach(function (dragEvent) {
  theImageContainer.addEventListener(dragEvent, preventDragDefault);
});

["dragover", "dragenter"].forEach((dragEvent) => {
  theImageContainer.addEventListener(dragEvent, function () {
    theImageContainer.classList.add("dragging");
  });
});

["dragleave", "dragend", "drop"].forEach((dragEvent) => {
  theImageContainer.addEventListener(dragEvent, function () {
    theImageContainer.classList.remove("dragging");
  });
});

theImageContainer.addEventListener("drop", function (e) {
  if (e.dataTransfer.files.length > 1) {
    theErrorMessage.innerHTML = "Drag only one file...";
    theErrorMessage.classList.remove("hide");
    return false;
  }
  const theFile = e.dataTransfer.files[0];
  theImageField.files[0] = theFile;

  if (checkFileProperties(theFile)) {
    handleUploadedFile(theFile);
  }
});

theImageField.onchange = (e) => {
  const theFile = e.target.files[0];

  if (checkFileProperties(theFile)) {
    handleUploadedFile(theFile);
  }
};

const checkFileProperties = (theFile) => {
  theErrorMessage.classList.add("hide");
  theSuccessMessage.classList.add("hide");

  if (theFile.type !== "image/png" && theFile.type !== "image/jpeg") {
    console.log("File type mismatch");
    theErrorMessage.innerHTML = "File type should be png or jpg/jpeg...";
    theErrorMessage.classList.remove("hide");
    return false;
  }

  if (theFile.size > 500000) {
    console.log("File too large");
    theErrorMessage.innerHTML = "File too large, cannot be more than 500KB...";
    theErrorMessage.classList.remove("hide");
    return false;
  }

  return true;
};

theImageForm.onsubmit = (e) => {
  e.preventDefault();
  const theImageTag = document.querySelector("#theImageTag");

  const caption = document.querySelector("#inputCaption").value;
  const locationName = document.querySelector("#inputLocation").value;
  const userId = localStorage.getItem("user-id");

  xhttp.open(POST, `${endPointRoot}/post`, true);
  const payload = {
    filename: fileName,
    fileSrc: theImageTag.getAttribute("src"),
    locationName: locationName,
    message: caption,
    userId: userId,
  };

  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.setRequestHeader("Authorization", getTokenLS());
  xhttp.send(JSON.stringify(payload));

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == HTTP_STATUS_CODE_CREATED) {
      theSuccessMessage.innerHTML = "Image uploaded successfully";
      theSuccessMessage.classList.remove("hide");
      const response = JSON.parse(this.response);
      console.log(response);
      setTimeout(() => {
        theSuccessMessage.classList.add("hide");
      }, 3000);
    }
  };
};

const clearImage = (e) => {
  if (e) {
    e.preventDefault();
  }

  const theImageTag = document.querySelector("#theImageTag");

  if (theImageTag) {
    theImageContainer.removeChild(theImageTag);
    theImageField.value = null;
  }

  theErrorMessage.classList.add("hide");
  theSuccessMessage.classList.add("hide");
};

// theClearImageLink.onclick = clearImage;

function preventDragDefault(e) {
  e.preventDefault();
  e.stopPropagation();
}

function handleUploadedFile(file) {
  fileName = file.name;
  clearImage();
  const img = document.createElement("img");
  img.setAttribute("id", "theImageTag");
  img.file = file;
  theImageContainer.appendChild(img);

  const reader = new FileReader();
  reader.onload = (function (aImg) {
    return function (e) {
      aImg.src = e.target.result;
    };
  })(img);
  reader.readAsDataURL(file);
}

//Grabs valid token stored in local storage.
const getTokenLS = () => {
  const token = localStorage.getItem("token");
  const authValue = AUTHBEARER + token;
  return authValue;
};