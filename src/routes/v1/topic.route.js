const express = require("express");
const validate = require("../../middlewares/validate");
const topicValidation = require("../../validations/topic.validation");
const topicController = require("../../controllers/topic.controller");
const auth = require("../../middlewares/auth");

const router = express.Router();

router.post(
  "/",
  auth(),
  validate(topicValidation.createTopic),
  topicController.createTopic
);
router.get("/", validate(topicValidation.topicList), topicController.topicList);
router.get(
  "/:topicId",
  auth(),
  validate(topicValidation.getTopic),
  topicController.getTopic
);
module.exports = router;
