const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const {
  addTopic,
  getTopicById,
  listTopic,
} = require("../services/topic.service");

const createTopic = catchAsync(async (req, res) => {
  const topicInfo = {
    name: req.body.name,
    createdBy: req.user.dataValues.id,
  };
  const topic = await addTopic(topicInfo);
  res.status(httpStatus.CREATED).send({ topic });
});

const getTopic = catchAsync(async (req, res) => {
  const { topicId } = req.params;
  const topic = await getTopicById(topicId);
  res.send({ topic });
});

const topicList = catchAsync(async (req, res) => {
  const topics = await listTopic(req.query);
  res.send({ topics });
});

module.exports = {
  createTopic,
  getTopic,
  topicList,
};
