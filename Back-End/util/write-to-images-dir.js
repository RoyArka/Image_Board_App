const fs = require("fs");

const writeToImagesDirectory = (fileSrc, filename) => {
  fileSrc = fileSrc.replace(/data:image\/(png|jpeg);base64,/, "");
  fs.writeFileSync(`images/${filename}`, fileSrc, {
    encoding: "base64",
  });
};

module.exports = writeToImagesDirectory;
