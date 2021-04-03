// module declarations alphabetized
const hostedEndPointRoot = "https://michealozdoba.com/4537/termproject/API/V1/"
const endPointRoot = "4537/termproject/API/V1/";
const GET = "GET";
const xhttp = new XMLHttpRequest();


//AJAX Stats GET
const statsGet = () => {
  xhttp.open(GET, `${endPointRoot}/stats`, true);
  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.responseText);
      //TODO: needs to implemented
    }
  };
};
