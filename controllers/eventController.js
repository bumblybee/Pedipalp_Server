const { crudControllers } = require("./crud/crudControllers");
const { Event } = require("../db");
const { Op } = require("sequelize");

module.exports = {
  ...crudControllers(Event, [["id", "ASC"]], [["id", "ASC"]], [["id", "ASC"]]),

  async getEvents(req, res) {
    // const {id: userId} = req.token.data;
    const { id: spiderId } = req.params;

    const records = await Event.findAll({ where: { spiderId } });

    res.status(200).json({ data: records });
  },
};
