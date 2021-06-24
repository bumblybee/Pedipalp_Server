"use strict";

const Sequelize = require("sequelize");

// Models

const UserModel = require("./models/user.js");
const SpiderModel = require("./models/spider");
const EventModel = require("./models/event");

// Database environment config
const env = process.env.NODE_ENV || "development";

let sequelize;

if (env !== "production") {
  sequelize = new Sequelize(
    process.env.DATABASE,
    process.env.DATABASE_USER,
    process.env.DATABASE_PASSWORD,
    { dialect: "postgres", logging: false, port: 5433 }
  );
} else {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  });
}

const User = UserModel(sequelize, Sequelize);
const Spider = SpiderModel(sequelize, Sequelize);
const Event = EventModel(sequelize, Sequelize);

// Relationships
User.hasMany(Spider);
Spider.belongsTo(User);
Spider.hasMany(Event);
Event.belongsTo(Spider);

// Authenticate db and log connection or err
sequelize
  .authenticate()
  .then(() => console.log("~~Database connected~~"))
  .catch((err) => console.log("Error:" + err));

module.exports = {
  sequelize,
  Sequelize,
  User,
  Spider,
  Event,
};
