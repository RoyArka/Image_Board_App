/* eslint-disable no-unused-vars */
const hostedEndPointRoot = "https://michealozdoba.com/4537/termproject/API/V1";
const endPointRoot = "4537/termproject/API/V1";
const POST = "POST";
const AUTHBEARER = "Bearer ";
const HTTP_CODE_FORBIDDEN = 403;

//AJAX Stats GET
const onload = () => {
  const userId = localStorage.getItem("user-id");
  const payload = {
    id: userId,
  };

  const xhttp = new XMLHttpRequest();
  xhttp.open(POST, `${endPointRoot}/stats`, true);
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.setRequestHeader("Authorization", getTokenLS());
  xhttp.send(JSON.stringify(payload));

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const rootStats = document.getElementById("rootStats");
      const statsResponse = JSON.parse(this.response).response;
      rootStats.innerHTML = formatStatisticsResult(statsResponse);
    }

    if (this.readyState == 4 && this.status == HTTP_CODE_FORBIDDEN) {
      const statsResponse = JSON.parse(this.response);
      console.log(statsResponse);
      renderResponse("Forbidden, admin status required", false);
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

const clearLocalStorage = () => {
  localStorage.removeItem("user-id");
  localStorage.removeItem("location-id");
  localStorage.removeItem("admin");
  localStorage.removeItem("token");
};

const renderResponse = (message, isSuccess) => {
  const responseMessage = document.getElementById("response-message");
  responseMessage.innerHTML = message;

  responseMessage.classList.add("response-error");
  responseMessage.classList.remove("hide");
};
