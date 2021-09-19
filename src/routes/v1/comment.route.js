const express = require("express");
const validate = require("../../middlewares/validate");
const commentValidation = require("../../validations/comment.validation");
const commentController = require("../../controllers/comment.controller");
const auth = require("../../middlewares/auth");
const media = require("./../../utils/media");
const router = express.Router();

router.post(
  "/",
  auth(),
  validate(commentValidation.addComment),
  commentController.addComment
);
module.exports = router;
