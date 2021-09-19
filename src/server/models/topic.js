"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class topic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }
  topic.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      createdBy: {
        type: DataTypes.INTEGER,
        references: { model: "users", key: "id", as: "author" },
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "topic",
    }
  );
  return topic;
};
