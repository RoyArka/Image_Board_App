const fs = require("fs");

function readImageFile(filename) {
  // read binary data from a file:
  const bitmap = fs.readFileSync(`images/${filename}`);
  const buf = new Buffer(bitmap);
  return buf;
}

const writeToImagesDirectory = (fileSrc, filename) => {
  fileSrc = fileSrc.replace(/data:image\/(png|jpeg);base64,/, "");
  fs.writeFileSync(`images/${filename}`, fileSrc, {
    encoding: "base64",
  });
};

module.exports = {
  readImageFile,
  writeToImagesDirectory,
};
