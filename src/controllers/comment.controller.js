const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { createComment } = require("../services/comment.service");

const addComment = catchAsync(async (req, res) => {
  const commentInfo = {
    comment: req.body.comment,
    commentedBy: req.user.dataValues.id,
    postId: req.body.postId,
  };
  const comment = await createComment(commentInfo);
  res.status(httpStatus.CREATED).send({message: "Comment added successfully"});
});

module.exports = {
  addComment,
};
