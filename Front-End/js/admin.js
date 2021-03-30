// module declarations alphabetized
const DELETE = "DELETE";
const endPointRoot = "COMP4537/termproj/api/v1/";
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
  let payload = JSON.stringify({
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
