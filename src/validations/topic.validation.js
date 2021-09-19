const Joi = require("joi");
const { password } = require("./custom.validation");

const createTopic = {
  body: Joi.object().keys({
    name: Joi.string().required(),
  }),
};

const getTopic = {
  params: Joi.object().keys({
    topicId: Joi.number().required(),
  }),
};

const topicList = {
  query: Joi.object().keys({
    page: Joi.number().required(),
    limit: Joi.number().required(),
    searchTerm: Joi.string().min(3).optional(),
  }),
};

module.exports = {
  createTopic,
  getTopic,
  topicList,
};
