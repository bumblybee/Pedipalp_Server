const { crudControllers } = require("./crud/crudControllers");
const { Event } = require("../db");
const { Op } = require("sequelize");

module.exports = crudControllers(
  Event,
  [["id", "ASC"]],
  [["id", "ASC"]],
  [["id", "ASC"]]
);
