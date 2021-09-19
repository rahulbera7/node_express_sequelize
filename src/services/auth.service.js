const httpStatus = require("http-status");
const tokenService = require("./token.service");
const userService = require("./user.service");
const bcrypt = require("bcryptjs");
const { Models } = require("../server/models");
const ApiError = require("../utils/ApiError");
const { tokenTypes } = require("../utils/tokens");

const loginUserWithEmailAndPassword = async (email, password) => {
  const userInfo = await Models.user.findOne({
    attributes: ["id", "password", "firstName", "lastName", "email"],
    where: { email },
  });
  if (bcrypt.compare(password, userInfo.password)) {
    delete userInfo.dataValues.password;
    return userInfo;
  } else {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect email or password");
  }
};

module.exports = {
  loginUserWithEmailAndPassword,
};
