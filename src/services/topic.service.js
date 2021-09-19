const httpStatus = require("http-status");
const { Models } = require("../server/models");
const email = require("../services/email.service");
const ApiError = require("../utils/ApiError");

const addTopic = async (userBody) => {
  if (await Models.topic.findOne({ where: { name: userBody.name } })) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Topic already taken");
  }
  const info = Models.topic.create(userBody);
  return info;
};

const listTopic = async (options) => {
  const users = await Models.topic.findAndCountAll({
    where: { isActive: true },
    include: [
      {
        model: Models.user,
        require: true,
        attributes: ["firstName", "lastName", "id"],
        as: "author",
      },
    ],
  });
  return users;
};

const getTopicById = async (id) => {
  const topicInfo = await Models.topic.findOne({
    include: [
      {
        model: Models.user,
        require: true,
        attributes: ["firstName", "lastName", "id"],
        as: "author",
      },
    ],
    where: { id, isActive: true },
  });
  return topicInfo;
};

module.exports = {
  addTopic,
  listTopic,
  getTopicById,
};
