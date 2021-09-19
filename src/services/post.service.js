const httpStatus = require("http-status");
const { Models } = require("../server/models");
const email = require("../services/email.service");
const ApiError = require("../utils/ApiError");
var Sequelize = require("sequelize");
const create = async (postBody) => {
  if (!(await Models.topic.findOne({ where: { id: postBody.topicId } }))) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Invalid topic");
  }
  return Models.post.create(postBody);
};

const list = async (req) => {
  const { page, limit } = req.query;
  const offset = (page - 1) * limit;
    const posts = await Models.post.findAndCountAll({
      attributes: ["id", "description", "createdAt"],
      include: [
        {
          model: Models.user,
          as: "creator",
          attributes: ["firstName", "lastName", "id"],
          require: true,
        },
        {
          model: Models.topic,
          as: "topic",
          attributes: ["name", "id"],
          require: true,
        },
        {
          model: Models.post_media,
          as: "media",
          attributes: ["path", "id"],
        },
        {
          model: Models.post_comment,
          as: "comments",
          attributes: ["comment", "id", "createdAt"],
          include: [
            {
              model: Models.user,
              as: "commentor",
              attributes: ["id", "firstName", "lastName"],
              order: [["id", "DESC"]],
            },
          ],
        },
      ],
      limit: parseInt(limit),
      offset: parseInt(offset),
      distinct: true,
      order: [["id", "DESC"]],
    });

    return posts;
};

const getPostById = async (id) => {
  return User.findById(id);
};

const addAttachments = async (attachments, postId, author) => {
  const _attchmts = [];

  const a = attachments.map((att) => {
    _attchmts.push(
      JSON.parse(JSON.stringify({ path: att, postId: postId, author: author }))
    );
  });
  return Models.post_media.bulkCreate(_attchmts);
};

module.exports = {
  create,
  getPostById,
  list,
  addAttachments,
};
