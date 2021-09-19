const Joi = require("joi");
const { password } = require("./custom.validation");

const addComment = {
  body: Joi.object().keys({
    comment: Joi.string().required(),
    postId: Joi.number().required(),
  }),
};

module.exports = {
  addComment,
};
