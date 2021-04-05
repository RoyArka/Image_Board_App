//Location Page Functions

/* eslint-disable no-unused-vars */
const isProduction = () => {
  return !document.URL.includes("localhost");
};

const DELETE = "DELETE";
const endPointRoot = isProduction()
  ? "https://michealozdoba.com/4537/termproject/API/V1"
  : "4537/termproject/API/V1";
const GET = "GET";
const HTTP_STATUS_CODE_CONFLICT = 409;
const HTTP_STATUS_CODE_OK = 200;
const POST = "POST";
const PUT = "PUT";
const xhttp = new XMLHttpRequest();


