const fs = require("fs");

function readImageFile(filename) {
  // read binary data from a file:
  const bitmap = fs.readFileSync(`images/${filename}`);
  const buf = new Buffer(bitmap);
  return buf;
}

const writeToImagesDirectory = (fileSrc, filePath) => {
  fileSrc = fileSrc.replace(/data:image\/(png|jpeg);base64,/, "");
  fs.writeFileSync(filePath, fileSrc, {
    encoding: "base64",
  });
};

module.exports = {
  readImageFile,
  writeToImagesDirectory,
};
