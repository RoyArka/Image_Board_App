// module declarations alphabetized
const DELETE = "DELETE";
const hostedEndPoint = "https://michealozdoba.com/4537/termproject/API/V1/"
const endPointRoot = "4537/termproject/API/V1/";
const GET = "GET";
const POST = "POST";
const PUT = "PUT";
const xhttp = new XMLHttpRequest();

// functions alphabetized
const deleteImage = (id) => {
  xhttp.open(DELETE, endPointRoot, true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  const payload = `id=${id}`;
  xhttp.send(payload);
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      // TODO: logic
    }
  };
};

const loadImages = () => {
  xhttp.open(GET, `${endPointRoot}`, true);
  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      // TODO: logic
    }
  };
};

const createImage = (id) => {
  const payload = JSON.stringify({
    id: id,
  });

  xhttp.open(POST, endPointRoot, true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(payload);

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      // TODO: logic
    }
  };
};

const updateImage = (id) => {
  let payload = JSON.stringify({
    id: id,
  });

  xhttp.open(PUT, endPointRoot, true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(payload);

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      // TODO: logic
    }
  };
};


let counterPOST = 0;
//login POST request function 
loginPost = () => {
  console.log("POST Request Sent!");
  xhttp.open(POST, hostedEndPoint + "login", true)
  xhttp.send("new user");
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 201) {
      counterPOST++;
      console.log(this);
      document.getElementById("res2").innerHTML = counterPOST;
      document.getElementById("res2-text").innerHTML = this.responseText;
      console.log("Server Response: " + this.responseText);
    }
  };
}

let counterGET = 0;
//location GET request function 
locationGet = () => {
  console.log("GET Request Sent!");
  xhttp.open(GET, hostedEndPoint + "location", true);
  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      counterGET++;
      console.log(this);
      document.getElementById("res1").innerHTML = counterGET;
      document.getElementById("res1-text").innerHTML = this.responseText;
      console.log("Server Response: " + this.responseText);
    }
  };
};