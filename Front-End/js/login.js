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

//AJAX Stats GET

const authenticate = (username, password) => {
  const id = localStorage.getItem("user-id");

  xhttp.open(POST, `${endPointRoot}/user/${id}`, true);
  xhttp.setRequestHeader("Content-Type", "application/json");

  const payload = { username: username };
  xhttp.send(JSON.stringify(payload));

  xhttp.onreadystatechange = function () {
    // TODO: sucessful username change
    if (this.readyState == 4 && this.status == HTTP_STATUS_CODE_OK) {
      const response = JSON.parse(this.response);
      localStorage.setItem("user-id", response[0].ID);
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
