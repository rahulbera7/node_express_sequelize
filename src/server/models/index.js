const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");

const basename = path.basename(module.filename);
const env = process.env.NODE_ENV || "development";
const config = require(`${__dirname}/../config/config.json`)[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    if (typeof model !== "function") return;
    sequelize[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

Models = sequelize;

Models.topic.belongsTo(Models.user, { as: "author", foreignKey: "createdBy" });
Models.user.hasMany(Models.topic, { as: "author", foreignKey: "createdBy" });

Models.post.belongsTo(Models.user, { as: "creator", foreignKey: "author" });
Models.user.hasMany(Models.post, { as: "creator", foreignKey: "author" });

Models.post.belongsTo(Models.topic, { as: "topic", foreignKey: "topicId" });
Models.user.hasMany(Models.post, { as: "topic", foreignKey: "topicId" });

Models.post_media.belongsTo(Models.post, { as: "media", foreignKey: "postId" });
Models.post.hasMany(Models.post_media, { as: "media", foreignKey: "postId" });

Models.post_comment.belongsTo(Models.post, {
  as: "comments",
  foreignKey: "postId",
});
Models.post.hasMany(Models.post_comment, {
  as: "comments",
  foreignKey: "postId",
});

Models.post_comment.belongsTo(Models.user, {
  as: "commentor",
  foreignKey: "commentedBy",
});
Models.user.hasMany(Models.post_comment, {
  as: "commentor",
  foreignKey: "commentedBy",
});

module.exports = { Models };
