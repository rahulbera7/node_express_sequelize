const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { create, list, addAttachments } = require("../services/post.service");

const createPost = catchAsync(async (req, res) => {
  req.body.author = req.user.dataValues.id;
  const _post = await create(req.body);
  if (_post.id && req.attachments.length) {
    const media = await addAttachments(req.attachments, _post.id, req.user.id);
    _post.dataValues.media = media;
  }
  res.status(httpStatus.CREATED).send({ _post });
});

const getPost = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);
  const tokens = await tokenService.generateAuthTokens(user);
  res.send({ user, tokens });
});

const postList = catchAsync(async (req, res) => {
  const posts = await list(req);
  res.send({ posts });
});

module.exports = {
  createPost,
  getPost,
  postList,
};
