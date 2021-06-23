const { crudControllers } = require("./crud/crudControllers");
const { Spider } = require("../db");
const { Op } = require("sequelize");

module.exports = crudControllers(
  Spider,
  [["id", "ASC"]],
  [["id", "ASC"]],
  [["id", "ASC"]]
);
