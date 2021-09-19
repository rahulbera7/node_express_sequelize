const Joi = require("joi");
const { password } = require("./custom.validation");

const createPost = {
  body: Joi.object().keys({
    description: Joi.string().required(),
    allowComments: Joi.boolean().required(),
    topicId: Joi.number().required(),
  }),
};

const getPost = {
  params: Joi.object().keys({
    postId: Joi.number().required(),
  }),
};

const postList = {
  query: Joi.object().keys({
    page: Joi.number().required(),
    limit: Joi.number().required(),
    searchTerm: Joi.string().min(3).optional(),
  }),
};

module.exports = {
  createPost,
  getPost,
  postList,
};
