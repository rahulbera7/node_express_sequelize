const httpStatus = require("http-status");
const { Models } = require("../server/models");
const email = require("../services/email.service");
const ApiError = require("../utils/ApiError");

const createComment = async (commentBody) => {
  if (!(await Models.post.findOne({ where: { id: commentBody.postId } }))) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Invalid post");
  }
  const info = Models.post_comment.create(commentBody);
  return info;
};

module.exports = {
  createComment,
};
