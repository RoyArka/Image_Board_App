// module declarations alphabetized
const hostedEndPointRoot = "https://michealozdoba.com/4537/termproject/API/V1/"
const endPointRoot = "4537/termproject/API/V1";
const GET = "GET";
const xhttp = new XMLHttpRequest();

//AJAX Stats GET
const statsGet = () => {
  const testData =
    '[{"ID":2,"Method":"GET","Endpoint":"/4537/termproject/API/V1/location","Requests":39},{"ID":3,"Method":"GET","Endpoint":"/4537/termproject/API/V1/stats","Requests":11},{"ID":4,"Method":"POST","Endpoint":"/4537/termproject/API/V1/location","Requests":46}]';
  // xhttp.open(GET, `${endPointRoot}/stats`, true);
  // xhttp.send();
  // xhttp.onreadystatechange = function () {
  //   if (this.readyState == 4 && this.status == 200) {
  //     const rootStats = document.getElementById("rootStats");
  //     const statsResponse = JSON.parse(this.response);
  //     const statsResponseTest = JSON.parse(testData);

  //     rootStats.innerHTML = formatStatisticsResult(statsResponseTest);
  //   }
  // };
  const rootStats = document.getElementById("rootStats");
  // const statsResponse = JSON.parse(this.response);
  const statsResponseTest = JSON.parse(testData);
  rootStats.innerHTML = formatStatisticsResult(statsResponseTest);
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
