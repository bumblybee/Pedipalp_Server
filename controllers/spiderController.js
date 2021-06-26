const { crudControllers } = require("./crud/crudControllers");
const { Spider } = require("../db");
const { Op } = require("sequelize");

module.exports = {
  ...crudControllers(
    Spider,
    [["name", "ASC"]],
    [["id", "ASC"]],
    [["id", "ASC"]]
  ),
  async getSpider(req, res) {
    const { id } = req.params;

    const record = await Spider.findOne({
      where: { [Op.and]: [{ id }, { isDeleted: false }] },
    });
    res.status(200).json({ data: record });
  },
};
