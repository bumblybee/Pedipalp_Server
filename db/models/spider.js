"use strict";

module.exports = (sequelize, DataTypes) => {
  const Spider = sequelize.define(
    "spider",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        field: "name",
      },
      age: {
        type: DataTypes.INTEGER,
        field: "age",
      },
      image: {
        type: DataTypes.STRING,
        field: "image",
      },
      species: {
        type: DataTypes.STRING,
        field: "species",
      },
      about: {
        type: DataTypes.TEXT,
        field: "about",
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        field: "is_deleted",
      },
      createdAt: {
        type: DataTypes.DATE,
        field: "created_at",
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: "updated_at",
      },
      deletedAt: {
        type: DataTypes.DATE,
        field: "deleted_at",
      },
    },
    {
      timestamps: true,
      paranoid: true,
    },

    { tableName: "spider" }
  );

  return Spider;
};
