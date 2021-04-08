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
const HTTP_STATUS_CODE_BAD_REQUEST = 400;
const HTTP_STATUS_CODE_CREATED = 201;
const HTTP_STATUS_CODE_OK = 200;
const POST = "POST";
const PUT = "PUT";
const xhttp = new XMLHttpRequest();

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
  const locationName = localStorage.getItem("location-id");
  const userId = localStorage.getItem("user-id");

  const payload = {
    filename: fileName,
    fileSrc: theImageTag.getAttribute("src"),
    locationName: locationName,
    userId: userId,
  };

  xhttp.open(POST, `${endPointRoot}/post`, true);
  xhttp.send(payload);

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == HTTP_STATUS_CODE_OK) {
      const response = JSON.parse(this.response);
      console.log(response);
      response.forEach((post) => {
        createPost({
          userId: post.UserID,
          imageSrc: post.ImagePath,
          message: post.Message,
        });
      });
    }
  };
};

const createPost = ({ userId, imageSrc, message }) => {
  const cardBody = document.createElement("div");
  cardBody.setAttribute("class", "card-body");

  const divPost = document.createElement("div");
  divPost.setAttribute(
    "class",
    "d-flex flex-column align-items-center text-center",
  );

  // Create Username Div
  const divPostUsername = document.createElement("div");
  divPostUsername.setAttribute("class", "mt-3");

  const h4Username = document.createElement("h4");
  h4Username.setAttribute("class", "post-username");
  h4Username.innerHTML = userId;

  divPostUsername.appendChild(h4Username);

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

  divPost.appendChild(divPostUsername);
  divPost.appendChild(divPostImage);
  divPost.appendChild(divPostMessage);

  cardBody.appendChild(divPost);

  const rootLocationPosts = document.getElementById("rootLocationPosts");
  const hr = document.createElement("hr");

  rootLocationPosts.appendChild(cardBody);
  rootLocationPosts.append(hr);
};
