const { crudControllers } = require("./crud/crudControllers");
const { Spider } = require("../db");

module.exports = crudControllers(
  Spider,
  [["id", "ASC"]],
  [["id", "ASC"]],
  [["id", "ASC"]]
);
