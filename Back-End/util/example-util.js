const formatResult = (result) => {
    let formattedResult = "<table>"
    formattedResult += "<tr><th>Quote</th> <th>Author</th></tr>";
    result.forEach(row => {
        formattedResult +="<tr>"
        formattedResult += `<td>${row.QUOTE}</td>`;
        formattedResult += `<td>${row.AUTHOR}</td>`;
        formattedResult +="</tr>"
    })
    formattedResult += "</table>";
    return formattedResult;
}

module.exports = formatResult;