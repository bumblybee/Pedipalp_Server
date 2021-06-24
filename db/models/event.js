"use strict";

module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define(
    "event",
    {
      date: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "date",
      },
      ate: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        field: "ate",
      },
      drank: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        field: "drank",
      },
      molted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        field: "molted",
      },
      notes: {
        type: DataTypes.TEXT,
        field: "notes",
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

    { tableName: "event" }
  );

  return Event;
};
