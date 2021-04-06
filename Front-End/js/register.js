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
const HTTP_STATUS_CODE_CREATED = 201;
const HTTP_STATUS_CODE_OK = 200;
const POST = "POST";
const PUT = "PUT";
const xhttp = new XMLHttpRequest();

const register = () => {
  const isAdmin = document.getElementById("admin-checkbox").checked;
  const password = document.getElementById("inputPassword").value;
  const username = document.getElementById("inputUsername").value;

  xhttp.open(POST, `${endPointRoot}/register`, true);
  xhttp.setRequestHeader("Content-Type", "application/json");

  const payload = {
    isAdmin: isAdmin,
    username: username,
    password: password,
  };

  xhttp.send(JSON.stringify(payload));

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == HTTP_STATUS_CODE_CREATED) {
      const response = JSON.parse(this.response);
      console.log(response);
      localStorage.setItem("user-id", response.insertId);
      window.location.href = "/home";
    }

    // TODO: handle user with name already exists
    if (this.readyState == 4 && this.status == HTTP_STATUS_CODE_CONFLICT) {
      const response = JSON.parse(this.response);
    }

    // TODO: handle server error
    if (this.readyState == 4 && this.status == 500) {
      const response = JSON.parse(this.response);
    }
    console.log(this);
  };
};
