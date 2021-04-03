const formatLocations = (result) => {
  let formattedResult = "<table>";
  formattedResult += "<tr><th>Name</th></tr>";
  result.forEach((row) => {
    formattedResult += "<tr>";
    formattedResult += `<td>${row.Name}</td>`;
    formattedResult += "</tr>";
  });
  formattedResult += "</table>";
  return formattedResult;
};

const formatReportingResult = (result) => {
  let formattedResult = "<table>";
  formattedResult +=
    "<tr><th>Method</th> <th>EndPoint</th> <th>Requests</th></tr>";
  result.forEach((row) => {
    formattedResult += "<tr>";
    formattedResult += `<td>${row.QUOTE}</td>`;
    formattedResult += `<td>${row.AUTHOR}</td>`;
    formattedResult += "</tr>";
  });
  formattedResult += "</table>";
  return formattedResult;
};

module.exports = {
  formatLocations,
  formatReportingResult,
};
