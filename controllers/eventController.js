const { crudControllers } = require("./crud/crudControllers");
const { Event } = require("../db");
const { Op } = require("sequelize");

module.exports = {
  ...crudControllers(Event, [["id", "ASC"]], [["id", "ASC"]], [["id", "ASC"]]),

  async getEvents(req, res) {
    const { id: userId } = req.token.data;
    const { id: spiderId } = req.params;

    const records = await Event.findAll({
      where: { [Op.and]: [{ spiderId }] },
      order: [["date", "DESC"]],
    });

    res.status(200).json({ data: records });
  },

  async createEvent(req, res) {
    const record = await Event.create(req.body, {
      returning: true,
      plain: true,
    });

    res.status(200).json({ data: record });
  },
};
