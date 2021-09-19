"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  post.init(
    {
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      author: {
        type: DataTypes.INTEGER,
        references: { model: "users", key: "id" },
        allowNull: false,
      },
      allowComments: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      topicId: {
        type: DataTypes.INTEGER,
        references: { model: "topics", key: "id" },
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "post",
    }
  );
  return post;
};
