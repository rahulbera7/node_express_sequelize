const express = require("express");
const validate = require("../../middlewares/validate");
const postValidation = require("../../validations/post.validation");
const postController = require("../../controllers/post.controller");
const auth = require("../../middlewares/auth");
const media = require("./../../utils/media");
const router = express.Router();

router.post(
  "/",
  auth(),
  media.validateFiles(),
  validate(postValidation.createPost),
  postController.createPost
);
router.get(
  "/",
  auth(),
  validate(postValidation.postList),
  postController.postList
);
router.get(
  "/:postId",
  auth(),
  validate(postValidation.getPost),
  postController.getPost
);
module.exports = router;
