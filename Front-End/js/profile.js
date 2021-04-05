/* eslint-disable no-unused-vars */

const DELETE = "DELETE";
const endPointRoot = "4537/termproject/API/V1";
const GET = "GET";
const hostedEndPointRoot = "https://michealozdoba.com/4537/termproject/API/V1";
const POST = "POST";
const xhttp = new XMLHttpRequest();

const createRowUsername = (userName) => {
  const divHeader = document.getElementById("row-header-username");

  const div = document.createElement("div");
  div.setAttribute("class", "col-sm-5 text-secondary");
  div.setAttribute("id", "row-username");
  div.innerHTML = userName;

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

const handleDoneChangeUsername = () => {
  document.getElementById("row-username-input").remove();
  document.getElementById("row-username-btn-editable").remove();

  createRowUsername("New Username");
};

const handleChangeUsername = () => {
  document.getElementById("row-username").remove();
  document.getElementById("row-username-btn").remove();

  createRowUsernameEditable();
};

//AJAX Stats GET
const getProfile = () => {
  // xhttp.open(GET, `${endPointRoot}/user/${id}`, true);
  // xhttp.send();
  // xhttp.onreadystatechange = function () {
  //   if (this.readyState == 4 && this.status == 200) {
  //     const response = JSON.parse(this.response);
  //   }
  // };

  const stubbedResponse = `
  [
    {
        "Username": "admin",
        "Password": "password",
        "DateJoined": 1617588473442,
        "Admin": 1
    }
  ]
  `;
  const response = JSON.parse(stubbedResponse);
  const { Admin, DateJoined, Password, Username } = response[0];

  const rowDateJoined = document.getElementById("row-date-joined");
  rowDateJoined.innerHTML = new Date(DateJoined).toDateString();

  const cardUsername = document.getElementById("card-username");
  cardUsername.innerHTML = Username;

  const rowMemberType = document.getElementById("row-member-type");
  rowMemberType.innerHTML = Admin === 1 ? "Admin" : "Member";

  const rowUsername = document.getElementById("row-username");
  rowUsername.innerHTML = Username;
};
