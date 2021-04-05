/* eslint-disable no-unused-vars */

const DELETE = "DELETE";
const endPointRoot = "4537/termproject/API/V1";
const GET = "GET";
const hostedEndPointRoot = "https://michealozdoba.com/4537/termproject/API/V1";
const POST = "POST";
const xhttp = new XMLHttpRequest();

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
