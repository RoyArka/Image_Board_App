const fs = require("fs");

function readFileFromPath(filePath) {
  // read binary data from a file:
  const bitmap = fs.readFileSync(filePath);
  const buf = new Buffer(bitmap);
  return buf;
}

const writeFileToPath = (fileSrc, filePath) => {
  fileSrc = fileSrc.replace(/data:image\/(png|jpeg);base64,/, "");
  fs.writeFileSync(filePath, fileSrc, {
    encoding: "base64",
  });
};

module.exports = {
  readFileFromPath,
  writeFileToPath,
};
