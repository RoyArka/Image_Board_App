/* eslint-disable no-unused-vars */
const hostedEndPointRoot = "https://michealozdoba.com/4537/termproject/API/V1";
const endPointRoot = "4537/termproject/API/V1";
const GET = "GET";
const xhttp = new XMLHttpRequest();
const AUTHBEARER = "Bearer ";

//TODO: need to add all other endpoints

//AJAX Stats GET
const statsGet = () => {
  xhttp.open(GET, `${endPointRoot}/stats`, true);
  xhttp.setRequestHeader("Authorization", getTokenLS());
  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const rootStats = document.getElementById("rootStats");
      const statsResponse = JSON.parse(this.response).response;
      rootStats.innerHTML = formatStatisticsResult(statsResponse);
    }
  };
};

const formatStatisticsResult = (result) => {
  let formattedResult = "<table>";
  formattedResult +=
    "<tr><th>Method</th> <th>EndPoint</th> <th>Requests</th></tr>";
  result.forEach((row) => {
    formattedResult += "<tr>";
    formattedResult += `<td>${row.Method}</td>`;
    formattedResult += `<td>${row.Endpoint}</td>`;
    formattedResult += `<td>${row.Requests}</td>`;
    formattedResult += "</tr>";
  });
  formattedResult += "</table>";
  return formattedResult;
};

//Grabs valid token stored in local storage.
const getTokenLS = () => {
  const token = localStorage.getItem("token");
  const authValue = AUTHBEARER + token;
  return authValue;
};
