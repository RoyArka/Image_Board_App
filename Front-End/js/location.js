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

const setTitle = () => {
  const location = localStorage.getItem("location-id");
  document.getElementById("locationTitle").innerHTML = `${location} Posts`;
};

const loadPosts = () => {
  const location = localStorage.getItem("location-id");
  setTitle();

  xhttp.open(GET, `${endPointRoot}/post/${location}`, true);
  xhttp.setRequestHeader("Content-Type", "application/json");

  xhttp.send();

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
