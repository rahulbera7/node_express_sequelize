const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const path = require("path");
const fs = require("fs");
const { forEach } = require("p-iteration");

const validateFiles = () => async (req, res, next) => {
  req.files.media.forEach((file) => {
    if (!file.name.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG)$/)) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Please upload valid file");
    }
  });
  const tmpPath = path.join(__dirname, "../../src/media");
  if (!fs.existsSync(`${tmpPath}`)) {
    fs.mkdirSync(`${tmpPath}`);
  }
  const _attachments = [];
  await forEach(req.files.media, async (file) => {
    const fileName = `${Date.now()}-${file.name}`;
    const uploadsDir = `${tmpPath}/${fileName}`;
    await file.mv(uploadsDir);
    _attachments.push(uploadsDir);
  });
  req.attachments = _attachments;
  next();
};

module.exports = { validateFiles };
